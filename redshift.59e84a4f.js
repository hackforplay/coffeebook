parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wm9m":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.language=exports.conf=void 0;var e={comments:{lineComment:"--",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}]};exports.conf=e;var _={defaultToken:"",tokenPostfix:".sql",ignoreCase:!0,brackets:[{open:"[",close:"]",token:"delimiter.square"},{open:"(",close:")",token:"delimiter.parenthesis"}],keywords:["AES128","AES256","ALL","ALLOWOVERWRITE","ANALYSE","ANALYZE","AND","ANY","ARRAY","AS","ASC","AUTHORIZATION","BACKUP","BETWEEN","BINARY","BLANKSASNULL","BOTH","BYTEDICT","BZIP2","CASE","CAST","CHECK","COLLATE","COLUMN","CONSTRAINT","CREATE","CREDENTIALS","CROSS","CURRENT_DATE","CURRENT_TIME","CURRENT_TIMESTAMP","CURRENT_USER","CURRENT_USER_ID","DEFAULT","DEFERRABLE","DEFLATE","DEFRAG","DELTA","DELTA32K","DESC","DISABLE","DISTINCT","DO","ELSE","EMPTYASNULL","ENABLE","ENCODE","ENCRYPT","ENCRYPTION","END","EXCEPT","EXPLICIT","FALSE","FOR","FOREIGN","FREEZE","FROM","FULL","GLOBALDICT256","GLOBALDICT64K","GRANT","GROUP","GZIP","HAVING","IDENTITY","IGNORE","ILIKE","IN","INITIALLY","INNER","INTERSECT","INTO","IS","ISNULL","JOIN","LEADING","LEFT","LIKE","LIMIT","LOCALTIME","LOCALTIMESTAMP","LUN","LUNS","LZO","LZOP","MINUS","MOSTLY13","MOSTLY32","MOSTLY8","NATURAL","NEW","NOT","NOTNULL","NULL","NULLS","OFF","OFFLINE","OFFSET","OID","OLD","ON","ONLY","OPEN","OR","ORDER","OUTER","OVERLAPS","PARALLEL","PARTITION","PERCENT","PERMISSIONS","PLACING","PRIMARY","RAW","READRATIO","RECOVER","REFERENCES","RESPECT","REJECTLOG","RESORT","RESTORE","RIGHT","SELECT","SESSION_USER","SIMILAR","SNAPSHOT","SOME","SYSDATE","SYSTEM","TABLE","TAG","TDES","TEXT255","TEXT32K","THEN","TIMESTAMP","TO","TOP","TRAILING","TRUE","TRUNCATECOLUMNS","UNION","UNIQUE","USER","USING","VERBOSE","WALLET","WHEN","WHERE","WITH","WITHOUT"],operators:["AND","BETWEEN","IN","LIKE","NOT","OR","IS","NULL","INTERSECT","UNION","INNER","JOIN","LEFT","OUTER","RIGHT"],builtinFunctions:["current_schema","current_schemas","has_database_privilege","has_schema_privilege","has_table_privilege","age","current_time","current_timestamp","localtime","isfinite","now","ascii","get_bit","get_byte","set_bit","set_byte","to_ascii","approximate percentile_disc","avg","count","listagg","max","median","min","percentile_cont","stddev_samp","stddev_pop","sum","var_samp","var_pop","bit_and","bit_or","bool_and","bool_or","cume_dist","first_value","lag","last_value","lead","nth_value","ratio_to_report","dense_rank","ntile","percent_rank","rank","row_number","case","coalesce","decode","greatest","least","nvl","nvl2","nullif","add_months","at time zone","convert_timezone","current_date","date_cmp","date_cmp_timestamp","date_cmp_timestamptz","date_part_year","dateadd","datediff","date_part","date_trunc","extract","getdate","interval_cmp","last_day","months_between","next_day","sysdate","timeofday","timestamp_cmp","timestamp_cmp_date","timestamp_cmp_timestamptz","timestamptz_cmp","timestamptz_cmp_date","timestamptz_cmp_timestamp","timezone","to_timestamp","trunc","abs","acos","asin","atan","atan2","cbrt","ceil","ceiling","checksum","cos","cot","degrees","dexp","dlog1","dlog10","exp","floor","ln","log","mod","pi","power","radians","random","round","sin","sign","sqrt","tan","to_hex","bpcharcmp","btrim","bttext_pattern_cmp","char_length","character_length","charindex","chr","concat","crc32","func_sha1","initcap","left and rights","len","length","lower","lpad and rpads","ltrim","md5","octet_length","position","quote_ident","quote_literal","regexp_count","regexp_instr","regexp_replace","regexp_substr","repeat","replace","replicate","reverse","rtrim","split_part","strpos","strtol","substring","textlen","translate","trim","upper","cast","convert","to_char","to_date","to_number","json_array_length","json_extract_array_element_text","json_extract_path_text","current_setting","pg_cancel_backend","pg_terminate_backend","set_config","current_database","current_user","current_user_id","pg_backend_pid","pg_last_copy_count","pg_last_copy_id","pg_last_query_id","pg_last_unload_count","session_user","slice_num","user","version","abbrev","acosd","any","area","array_agg","array_append","array_cat","array_dims","array_fill","array_length","array_lower","array_ndims","array_position","array_positions","array_prepend","array_remove","array_replace","array_to_json","array_to_string","array_to_tsvector","array_upper","asind","atan2d","atand","bit","bit_length","bound_box","box","brin_summarize_new_values","broadcast","cardinality","center","circle","clock_timestamp","col_description","concat_ws","convert_from","convert_to","corr","cosd","cotd","covar_pop","covar_samp","current_catalog","current_query","current_role","currval","cursor_to_xml","diameter","div","encode","enum_first","enum_last","enum_range","every","family","format","format_type","generate_series","generate_subscripts","get_current_ts_config","gin_clean_pending_list","grouping","has_any_column_privilege","has_column_privilege","has_foreign_data_wrapper_privilege","has_function_privilege","has_language_privilege","has_sequence_privilege","has_server_privilege","has_tablespace_privilege","has_type_privilege","height","host","hostmask","inet_client_addr","inet_client_port","inet_merge","inet_same_family","inet_server_addr","inet_server_port","isclosed","isempty","isopen","json_agg","json_object","json_object_agg","json_populate_record","json_populate_recordset","json_to_record","json_to_recordset","jsonb_agg","jsonb_object_agg","justify_days","justify_hours","justify_interval","lastval","left","line","localtimestamp","lower_inc","lower_inf","lpad","lseg","make_date","make_interval","make_time","make_timestamp","make_timestamptz","masklen","mode","netmask","network","nextval","npoints","num_nonnulls","num_nulls","numnode","obj_description","overlay","parse_ident","path","pclose","percentile_disc","pg_advisory_lock","pg_advisory_lock_shared","pg_advisory_unlock","pg_advisory_unlock_all","pg_advisory_unlock_shared","pg_advisory_xact_lock","pg_advisory_xact_lock_shared","pg_backup_start_time","pg_blocking_pids","pg_client_encoding","pg_collation_is_visible","pg_column_size","pg_conf_load_time","pg_control_checkpoint","pg_control_init","pg_control_recovery","pg_control_system","pg_conversion_is_visible","pg_create_logical_replication_slot","pg_create_physical_replication_slot","pg_create_restore_point","pg_current_xlog_flush_location","pg_current_xlog_insert_location","pg_current_xlog_location","pg_database_size","pg_describe_object","pg_drop_replication_slot","pg_export_snapshot","pg_filenode_relation","pg_function_is_visible","pg_get_constraintdef","pg_get_expr","pg_get_function_arguments","pg_get_function_identity_arguments","pg_get_function_result","pg_get_functiondef","pg_get_indexdef","pg_get_keywords","pg_get_object_address","pg_get_owned_sequence","pg_get_ruledef","pg_get_serial_sequence","pg_get_triggerdef","pg_get_userbyid","pg_get_viewdef","pg_has_role","pg_identify_object","pg_identify_object_as_address","pg_index_column_has_property","pg_index_has_property","pg_indexam_has_property","pg_indexes_size","pg_is_in_backup","pg_is_in_recovery","pg_is_other_temp_schema","pg_is_xlog_replay_paused","pg_last_committed_xact","pg_last_xact_replay_timestamp","pg_last_xlog_receive_location","pg_last_xlog_replay_location","pg_listening_channels","pg_logical_emit_message","pg_logical_slot_get_binary_changes","pg_logical_slot_get_changes","pg_logical_slot_peek_binary_changes","pg_logical_slot_peek_changes","pg_ls_dir","pg_my_temp_schema","pg_notification_queue_usage","pg_opclass_is_visible","pg_operator_is_visible","pg_opfamily_is_visible","pg_options_to_table","pg_postmaster_start_time","pg_read_binary_file","pg_read_file","pg_relation_filenode","pg_relation_filepath","pg_relation_size","pg_reload_conf","pg_replication_origin_create","pg_replication_origin_drop","pg_replication_origin_oid","pg_replication_origin_progress","pg_replication_origin_session_is_setup","pg_replication_origin_session_progress","pg_replication_origin_session_reset","pg_replication_origin_session_setup","pg_replication_origin_xact_reset","pg_replication_origin_xact_setup","pg_rotate_logfile","pg_size_bytes","pg_size_pretty","pg_sleep","pg_sleep_for","pg_sleep_until","pg_start_backup","pg_stat_file","pg_stop_backup","pg_switch_xlog","pg_table_is_visible","pg_table_size","pg_tablespace_databases","pg_tablespace_location","pg_tablespace_size","pg_total_relation_size","pg_trigger_depth","pg_try_advisory_lock","pg_try_advisory_lock_shared","pg_try_advisory_xact_lock","pg_try_advisory_xact_lock_shared","pg_ts_config_is_visible","pg_ts_dict_is_visible","pg_ts_parser_is_visible","pg_ts_template_is_visible","pg_type_is_visible","pg_typeof","pg_xact_commit_timestamp","pg_xlog_location_diff","pg_xlog_replay_pause","pg_xlog_replay_resume","pg_xlogfile_name","pg_xlogfile_name_offset","phraseto_tsquery","plainto_tsquery","point","polygon","popen","pqserverversion","query_to_xml","querytree","quote_nullable","radius","range_merge","regexp_matches","regexp_split_to_array","regexp_split_to_table","regr_avgx","regr_avgy","regr_count","regr_intercept","regr_r2","regr_slope","regr_sxx","regr_sxy","regr_syy","right","row_security_active","row_to_json","rpad","scale","set_masklen","setseed","setval","setweight","shobj_description","sind","sprintf","statement_timestamp","stddev","string_agg","string_to_array","strip","substr","table_to_xml","table_to_xml_and_xmlschema","tand","text","to_json","to_regclass","to_regnamespace","to_regoper","to_regoperator","to_regproc","to_regprocedure","to_regrole","to_regtype","to_tsquery","to_tsvector","transaction_timestamp","ts_debug","ts_delete","ts_filter","ts_headline","ts_lexize","ts_parse","ts_rank","ts_rank_cd","ts_rewrite","ts_stat","ts_token_type","tsquery_phrase","tsvector_to_array","tsvector_update_trigger","tsvector_update_trigger_column","txid_current","txid_current_snapshot","txid_snapshot_xip","txid_snapshot_xmax","txid_snapshot_xmin","txid_visible_in_snapshot","unnest","upper_inc","upper_inf","variance","width","width_bucket","xml_is_well_formed","xml_is_well_formed_content","xml_is_well_formed_document","xmlagg","xmlcomment","xmlconcat","xmlelement","xmlexists","xmlforest","xmlparse","xmlpi","xmlroot","xmlserialize","xpath","xpath_exists"],builtinVariables:[],pseudoColumns:[],tokenizer:{root:[{include:"@comments"},{include:"@whitespace"},{include:"@pseudoColumns"},{include:"@numbers"},{include:"@strings"},{include:"@complexIdentifiers"},{include:"@scopes"},[/[;,.]/,"delimiter"],[/[()]/,"@brackets"],[/[\w@#$]+/,{cases:{"@keywords":"keyword","@operators":"operator","@builtinVariables":"predefined","@builtinFunctions":"predefined","@default":"identifier"}}],[/[<>=!%&+\-*/|~^]/,"operator"]],whitespace:[[/\s+/,"white"]],comments:[[/--+.*/,"comment"],[/\/\*/,{token:"comment.quote",next:"@comment"}]],comment:[[/[^*/]+/,"comment"],[/\*\//,{token:"comment.quote",next:"@pop"}],[/./,"comment"]],pseudoColumns:[[/[$][A-Za-z_][\w@#$]*/,{cases:{"@pseudoColumns":"predefined","@default":"identifier"}}]],numbers:[[/0[xX][0-9a-fA-F]*/,"number"],[/[$][+-]*\d*(\.\d*)?/,"number"],[/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/,"number"]],strings:[[/'/,{token:"string",next:"@string"}]],string:[[/[^']+/,"string"],[/''/,"string"],[/'/,{token:"string",next:"@pop"}]],complexIdentifiers:[[/"/,{token:"identifier.quote",next:"@quotedIdentifier"}]],quotedIdentifier:[[/[^"]+/,"identifier"],[/""/,"identifier"],[/"/,{token:"identifier.quote",next:"@pop"}]],scopes:[]}};exports.language=_;
},{}]},{},["wm9m"], null)
//# sourceMappingURL=/coffeebook/redshift.59e84a4f.js.map