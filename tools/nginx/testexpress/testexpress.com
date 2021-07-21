server {
    listen 8081;

    server_name testexpress.com www.testexpress.com;

    charset utf-8;

    access_log /var/log/nginx/testexpress.com.access.log;
    error_log /var/log/nginx/testexpress.com.error.log;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
