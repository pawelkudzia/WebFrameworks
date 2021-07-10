#!/bin/bash

function create_directory() {
    directory=$1

    if [ -e $directory -a -d $directory ]
    then
        rm -r $directory
    fi

    mkdir $directory

    echo -e "Directory $directory recreated\n"
}

function run_go_wrk_warmup() {
    tool="go_wrk"
    urls=(
        "http://localhost:5000/api/json"
        "http://localhost:5000/api/plaintext"
        "http://localhost:5000/api/base64"
        "http://localhost:5000/api/measurements/random"
        "http://localhost:5000/api/measurements"
        "http://localhost:5000/api/measurements?page=1&limit=100"
        "http://localhost:5000/api/measurements?page=1&limit=1000"
        "http://localhost:5000/api/measurements/location"
        "http://localhost:5000/api/measurements/queries?count=10"
        "http://localhost:5000/api/measurements/queries?count=100"
    )

    echo "--- Warmup: $tool ---"
    echo "Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"

    for url in ${urls[@]}
    do
        echo "GET $url"
        for concurrency in ${warmup_concurrency_clients[@]}
        do
            go-wrk -d $warmup_time -c $concurrency -H "Accept: application/json" -H "Connection: keep-alive" -T $timeout $url
            echo -e "Concurrency $concurrency completed\n"
            sleep $warmup_sleep
        done
        sleep $warmup_sleep
    done

    echo -e "Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

function run_go_wrk_test() {
    tool="go_wrk"
    url=$1
    test_type=$2
    method=$3

    echo "--- Tests: $tool ---"
    echo "Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "$method $url"

    for concurrency in ${test_concurrency_clients[@]}
    do
        file="$tool/${tool}_${test_type}_${concurrency}.txt"
        go-wrk -M $method -d $test_time -c $concurrency -H "Accept: application/json" -H "Connection: keep-alive" -T $timeout $url > $file
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
    test_time=60
    test_sleep=5

    timeout=30000

    # endpoints
    base_url="http://localhost:5000/api/"

    json_url="${base_url}json"
    plaintext_url="${base_url}plaintext"
    base64_url="${base_url}base64"
    measurements_random_url="${base_url}measurements/random"
    measurements_url="${base_url}measurements"
    measurements_100_url="${base_url}measurements?page=1&limit=100"
    measurements_1000_url="${base_url}measurements?page=1&limit=1000"
    measurements_location_url="${base_url}measurements/location"
    measurements_queries_10_url="${base_url}measurements/queries?count=10"
    measurements_queries_100_url="${base_url}measurements/queries?count=100"
    measurements_create_url="${base_url}measurements/random"
    measurements_update_url="${base_url}measurements/random"

    # directories
    create_directory "go_wrk"

    # tests
    run_go_wrk_warmup
    sleep 5
    run_go_wrk_test $json_url "json" "GET"
    # run_go_wrk_test $plaintext_url "plaintext" "GET"
    # run_go_wrk_test $base64_url "base64" "GET"
    # run_go_wrk_test $measurements_random_url "measurements_random" "GET"
    # run_go_wrk_test $measurements_url "measurements" "GET"
    # run_go_wrk_test $measurements_100_url "measurements100" "GET"
    # run_go_wrk_test $measurements_1000_url "measurements1000" "GET"
    # run_go_wrk_test $measurements_location_url "measurements_location" "GET"
    # run_go_wrk_test $measurements_queries_10_url "measurements_queries10" "GET"
    # run_go_wrk_test $measurements_queries_100_url "measurements_queries100" "GET"
    # run_go_wrk_test $measurements_create_url "measurements_create" "POST"
    # run_go_wrk_test $measurements_update_url "measurements_update" "PUT"

    echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
}

# program
main
