#!/bin/bash

# This script is used for removing benchmark related files and directories.
# To run this script use command: ./clean_data.sh

var_dir="/var"
log_dir="$var_dir/log/nginx"
www_dir="$var_dir/www"

nginx_dir="/etc/nginx"
nginx_sites_enabled_dir="$nginx_dir/sites-enabled"
nginx_sites_available_dir="$nginx_dir/sites-available"

log_pattern=".log"
test_pattern="test"

# Run actions.
echo -e "Script Start: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"

sudo rm -r -f "$log_dir/"*"$log_pattern"*
sudo rm -r -f "$www_dir/$test_pattern"*
sudo rm -f "$nginx_sites_enabled_dir/$test_pattern"*
sudo rm -f "$nginx_sites_available_dir/$test_pattern"*

echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
