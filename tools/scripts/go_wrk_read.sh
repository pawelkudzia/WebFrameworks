# config
concurrency_clients=(1 16 32 64 128 256)
go_wrk_path="/home/tester/go/bin/go-wrk"
output_dir="/home/tester/Desktop/results"
method="GET"
timeout=30000
warmup_time=10
warmup_sleep=5
test_time=60
test_sleep=5
after_warmup_sleep=10
between_test_sleep=6

# endpoints
url_path="http://localhost:8081/api"

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

# run warmup
function run_warmup() {
    local url=$1
    local method=$2

    echo "Warmup Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "URL: $url"
    for concurrency in ${concurrency_clients[@]}
    do
        $go_wrk_path -M $method -d $warmup_time -c $concurrency -H "Accept: application/json" -H "Connection: keep-alive" -T $timeout $url
        echo "Concurrency $concurrency completed"
        sleep $warmup_sleep
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

    for (( i=0; i<${#urls[@]}; i++ ))
    do
        run_warmup ${urls[$i]} $method
        sleep $between_test_sleep
    done

    sleep $after_warmup_sleep

    for (( i=0; i<${#urls[@]}; i++ ))
    do
        run_test ${urls[$i]} ${output_files[$i]} $method
        sleep $between_test_sleep
    done

    echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
}

# program
main
