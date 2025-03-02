#!/bin/nu

#
# CONFIG
#

let prefix = "ycsb"
let data_dir = ".data"
let seconds = 1 * 120
let cache_mib = 4000
let value_size = 256

#
# BENCH
#

alias bench = cargo run --features localfjall -r --

let cache = $cache_mib * 1_024 * 1_024

for db_size in [100000000] {
    let ks = $db_size / 1000;

    for task in ["ycsb-a"] {
        let prefix = [$prefix, $task, (($ks | into string) + "K")] | str join "_";

        for db in ["local-fjall", "fjall"] {
            let out = $prefix + "_" + $db + ".jsonl";
            print $out;
            RUST_LOG=error bench run --seconds $seconds --out $out --workload $task --value-size $value_size --backend $db --data-dir $data_dir --item-count $db_size --cache-size $cache_mib --lsm-compaction tiered
            sleep 1sec
        }
    
        # Generate report for the workload
        let report_file = ("report_" + $prefix + ".html")
        print $report_file;

        bench report --out $report_file (($prefix + "_*.jsonl") | into glob)
        open $report_file
    }
}
