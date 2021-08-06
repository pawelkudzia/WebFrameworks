#!/bin/bash

# This script is used for performing create and update tests (POST and PUT requests).
# To run this script use command: ./drill_create_update.sh

# Path to drill binary.
drill_path="/home/tester/Desktop/drill/drill"

# Path to directory where output files are stored after completed tests.
output_dir="/home/tester/Desktop/results"

# drill parameter: Max timeout for single request (milliseconds).
timeout=40000

# Contains number of requests which are tested.
requests=(1000 10000)

# Time to wait before starting next requests test in real tests (seconds).
test_sleep=5

# Time to wait before starting next benchmark test in real tests (seconds).
between_test_sleep=6

# Path to directory where benchmark files are stored.
benchmark_dir="/home/tester/Desktop/drill"

# Contains benchmark files which are used for creating tests.
benchmark_files=(
    "${benchmark_dir}/measurements_random_create"
    "${benchmark_dir}/measurements_random_update"
)

# Contains parts of names which are used for creating output files.
output_files=(
    "measurements_random_create"
    "measurements_random_update"
)

# Performs single real test (creates output files).
function run_test() {
    local tool="drill"
    local benchmark_file=$1
    local test_type=$2
    
    echo "Test Start: $(date --utc "+%Y-%m-%d %H:%M:%S")"
    echo "Benchmark: $test_type"

    for request in "${requests[@]}"
    do
        file="${output_dir}/${tool}_${test_type}_${request}.txt"
        $drill_path --stats --timeout $timeout --benchmark "${benchmark_file}_${request}.yml" > "$file"
        echo "Requests $request completed"
        sleep $test_sleep
    done

    echo -e "Test Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
}

# Entry point of script.
function main() {
    echo -e "Script Start: $(date --utc "+%Y-%m-%d %H:%M:%S")\n"
    
    for (( i=0; i<${#benchmark_files[@]}; i++ ))
    do
        run_test "${benchmark_files[$i]}" "${output_files[$i]}"
        sleep $between_test_sleep
    done

    echo "Script Finish: $(date --utc "+%Y-%m-%d %H:%M:%S")"
}

# Runs actions.
main
