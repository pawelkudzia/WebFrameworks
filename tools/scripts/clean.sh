#!/bin/bash

# This script is used for removing benchmark related files and directories.
# To run this script use command: ./clean.sh

# Path to var directory.
var_dir="/var"

# Path to directory where nginx logs are stored.
log_dir="$var_dir/log/nginx"

# Path to directory where web services are stored.
www_dir="$var_dir/www"

# Path to nginx directory.
nginx_dir="/etc/nginx"

# Path to nginx sites-enabled directory.
nginx_sites_enabled_dir="$nginx_dir/sites-enabled"

# Path to nginx sites-available directory (server blocks).
nginx_sites_available_dir="$nginx_dir/sites-available"

# Pattern for log files to remove.
log_pattern=".log"

# Pattern for test files to remove.
test_pattern="test"

# Run actions.
echo -e "Script Start: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"

sudo rm -r -f "$log_dir/"*"$log_pattern"*
sudo rm -r -f "$www_dir/$test_pattern"*
sudo rm -f "$nginx_sites_enabled_dir/$test_pattern"*
sudo rm -f "$nginx_sites_available_dir/$test_pattern"*

echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
