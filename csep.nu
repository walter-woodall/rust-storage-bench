#!/bin/nu

#
# CONFIG
#

let prefix = "ycsb"
let data_dir = ".data"
let seconds = 1 * 180
let cache_mib = 4000
let value_size = 1024
let display_name = "baseline"

#
# BENCH
#

alias bench = cargo run --features localfjall -r --

let cache = $cache_mib * 1_024 * 1_024

for db_size in [40_000_000] {
    let ks = $db_size / 1000;

    for task in ["ycsb-c"] {
        let prefix = [$prefix, $task, (($ks | into string) + "K")] | str join "_";

        for db in ["local-fjall"] {
            let out = $prefix + "_" + $display_name + ".jsonl";
            print $out;
            RUST_LOG=error bench run --seconds $seconds --out $out --display-name $display_name --workload $task --value-size $value_size --backend $db --data-dir $data_dir --item-count $db_size --cache-size $cache_mib --lsm-compaction tiered
        }
    }
}
