# config
concurrency_clients=(1 16 32 64 128 256)
go_wrk_path="/home/tester/go/bin/go-wrk"
method="GET"
output_dir="/home/tester/Desktop/results"
test_time=60
test_sleep=5
between_test_sleep=10
timeout=30000

# endpoints
url_json="http://localhost:8081/api/json"
url_plaintext="http://localhost:8081/api/plaintext"

# run warmup
function run_warmup() {
    local url=$1
    local test_type=$2
    local method=$3

    echo "Warmup Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "URL: $url"
    for concurrency in ${concurrency_clients[@]}
    do
        $go_wrk_path -M $method -d $test_time -c $concurrency -H "Accept: application/json" -H "Connection: keep-alive" -T $timeout $url
        echo "Concurrency $concurrency completed"
        sleep $test_sleep
    done
    echo -e "Warmup Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

# run single go-wrk test
function run_test() {
    local tool="go_wrk"
    local url=$1
    local test_type=$2
    local method=$3

    echo "Test Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "URL: $url"
    for concurrency in ${concurrency_clients[@]}
    do
        file="${output_dir}/${tool}_${test_type}_${concurrency}.txt"
        $go_wrk_path -M $method -d $test_time -c $concurrency -H "Accept: application/json" -H "Connection: keep-alive" -T $timeout $url > $file
        echo "Concurrency $concurrency completed"
        sleep $test_sleep
    done
    echo -e "Test Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

# entry point
function main() {
    echo -e "Script Start: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
    run_test $url_json "json" $method
    sleep $between_test_sleep
    run_test $url_plaintext "plaintext" $method
    echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
}

# program
main
