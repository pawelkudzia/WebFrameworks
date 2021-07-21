server {
    listen 8081;

    server_name testlaravel.com www.testlaravel.com;

    root /var/www/testlaravel.com/webservice/public;

    index index.php;

    charset utf-8;

    access_log /var/log/nginx/testlaravel.com.access.log;
    error_log /var/log/nginx/testlaravel.com.error.log;

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.0-fpm.sock;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
