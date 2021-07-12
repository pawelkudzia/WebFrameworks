#!/bin/bash

# This script is used for performing read tests (GET requests).
# To run this script use command: ./go_wrk_read.sh

# Path to go-wrk binary.
go_wrk_path="/home/tester/go/bin/go-wrk"

# Path to directory where output files are stored after completed tests.
output_dir="/home/tester/Desktop/results"

# go-wrk parameter: HTTP request method.
method="GET"

# go-wrk parameter: Max timeout for single request (milliseconds).
timeout=20000

# Contains concurrent clients.
concurrent_clients=(1 16 32 64 128 256)

# Time to wait before starting next concurrency test in warmup (seconds).
warmup_time=1

# Time to wait before starting next concurrency test in warmup (seconds).
warmup_sleep=1

# Time to wait before starting next URL test in warmup (seconds).
between_warmup_sleep=1

# Time to complete single test in real tests (seconds).
test_time=1

# Time to wait before starting next concurrency test in real tests (seconds).
test_sleep=1

# Time to wait before starting next URL test in real tests (seconds).
between_test_sleep=1

# Time to wait before starting real tests after completed warmup (seconds).
after_warmup_sleep=1

# Base URL path.
url_path="http://localhost:8081/api"

# Contains URLs which are tested.
urls=(
    "${url_path}/json"
    "${url_path}/plaintext"
    "${url_path}/base64"
    "${url_path}/measurements/random"
    "${url_path}/measurements"
    "${url_path}/measurements?page=1&limit=100"
    "${url_path}/measurements?page=1&limit=1000"
    "${url_path}/measurements/location"
    "${url_path}/measurements/queries?count=5"
    "${url_path}/measurements/queries?count=10"
)

# Contains parts of names which are used for creating output files.
output_files=(
    "json"
    "plaintext"
    "base64"
    "measurements_random"
    "measurements"
    "measurements100"
    "measurements1000"
    "measurements_location"
    "measurements_queries5"
    "measurements_queries10"
)

# Performs single warmup.
function run_warmup() {
    local url=$1
    local method=$2

    echo "Warmup Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "URL: $url"

    for concurrency in "${concurrent_clients[@]}"
    do
        $go_wrk_path -M "$method" -d $warmup_time -c "$concurrency" -H "Accept: application/json" -H "Connection: keep-alive" -T $timeout "$url"
        echo "Concurrency $concurrency completed"
        sleep $warmup_sleep
    done

    echo -e "Warmup Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

# Performs single real test (creates output files).
function run_test() {
    local tool="go_wrk"
    local url=$1
    local test_type=$2
    local method=$3

    echo "Test Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "URL: $url"

    for concurrency in "${concurrent_clients[@]}"
    do
        file="${output_dir}/${tool}_${test_type}_${concurrency}.txt"
        $go_wrk_path -M "$method" -d $test_time -c "$concurrency" -H "Accept: application/json" -H "Connection: keep-alive" -T $timeout "$url" > "$file"
        echo "Concurrency $concurrency completed"
        sleep "$test_sleep"
    done

    echo -e "Test Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

# Entry point of script.
function main() {
    echo -e "Script Start: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"

    for (( i=0; i<${#urls[@]}; i++ ))
    do
        run_warmup "${urls[$i]}" "$method"
        sleep $between_warmup_sleep
    done

    sleep $after_warmup_sleep

    for (( i=0; i<${#urls[@]}; i++ ))
    do
        run_test "${urls[$i]}" "${output_files[$i]}" "$method"
        sleep $between_test_sleep
    done

    echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
}

# Run script.
main
