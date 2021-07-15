#!/bin/bash

# This script is used for starting web service.
# To run this script use command: ./testexpress.sh

# Path to input web service directory.
input_base_dir="/home/tester/Desktop/testexpress"

# Path to server block file.
input_server_block_path="$input_base_dir/testexpress.com"

# Path to web service files.
input_webservice_dir="$input_base_dir/webservice"

# Path to directory where web service files are stored.
destination_dir="/var/www/testexpress.com"

# Path to nginx server block file for current web service.
nginx_sites_available_server_block_path="/etc/nginx/sites-available/testexpress.com"

# Path to nginx sites-enabled directory.
nginx_sites_enabled_dir="/etc/nginx/sites-enabled/"

# Run actions.
echo -e "Script Start: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"

# Stop nginx.
sudo systemctl stop nginx

# Create directory where files are stored.
sudo mkdir -p $destination_dir

# Move files to destination directory.
sudo mv "$input_webservice_dir/" "$destination_dir/"

# Go to destination directory.
cd "$destination_dir/webservice" || exit
npm install

# Change owner of destination directory.
sudo chown -R www-data: $destination_dir

# Move server block file to nginx config directory.
sudo mv $input_server_block_path $nginx_sites_available_server_block_path

# Change file mode bits.
sudo chmod 644 $nginx_sites_available_server_block_path

# Create symbolic link.
sudo ln -s $nginx_sites_available_server_block_path $nginx_sites_enabled_dir

# Check if nginx server block files are valid.
sudo nginx -t

# Restart nginx.
sudo systemctl restart nginx

# Check status of nginx.
sudo systemctl status nginx

# Run web service.
sudo pm2 start src/app.js -i max
sudo pm2 save

echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
