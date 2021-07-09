#!/bin/bash

function create_directories() {
    for directory in $1
    do
        mkdir $directory
    done
    echo -e "Directories created\n"
}

function run_loadtest_warmup() {
    tool="loadtest"
    urls=(
        "http://localhost:5000/api/json"
        "http://localhost:5000/api/measurements/random"
        "http://localhost:5000/api/measurements"
        "http://localhost:5000/api/measurements?page=1&limit=100"
    )

    echo "--- Warmup: $tool ---"
    echo "Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"

    for url in ${urls[@]}
    do
        echo "URL: $url"
        for concurrency in ${warmup_concurrency_clients[@]}
        do
            loadtest --maxSeconds $warmup_time --concurrency $concurrency --keepalive -H Accept:application/json --timeout $timeout --quiet $url
            echo -e "Concurrency $concurrency completed\n"
            sleep $warmup_sleep
        done
        sleep $warmup_sleep
    done
    echo -e "Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

function run_loadtest_test() {
    tool="loadtest"
    url=$1
    test_type=$2

    echo "--- Tests: $tool ---"
    echo "Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "URL: $url"

    for concurrency in ${test_concurrency_clients[@]}
    do
        file="$tool/${tool}_${test_type}_${concurrency}.txt"
        loadtest --maxSeconds $test_time --concurrency $concurrency --keepalive -H Accept:application/json --timeout $timeout $url > $file
        echo "Concurrency $concurrency completed"
        sleep $test_sleep
    done
    echo -e "Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

function main() {
    echo -e "Script Start: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"

    # config
    warmup_concurrency_clients=(1 16 32 64 128 256)
    warmup_time=1
    warmup_sleep=1

    test_concurrency_clients=(1 16 32 64 128 256)
    test_time=1
    test_sleep=1

    timeout=30000

    # endpoints
    base_url="http://localhost:5000/api/"
    json_url="${base_url}json"
    plaintext_url="${base_url}plaintext"
    base64_url="${base_url}base64"

    # tests
    create_directories "loadtest"

    run_loadtest_warmup
    run_loadtest_test $json_url "json"
    run_loadtest_test $plaintext_url "plaintext"
    run_loadtest_test $base64_url "base64"

    echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
}

# program
main
