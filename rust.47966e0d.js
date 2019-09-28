parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"cYYK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.language=exports.conf=void 0;var e={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"[",close:"]"},{open:"{",close:"}"},{open:"(",close:")"},{open:"'",close:"'",notIn:["string","comment"]},{open:'"',close:'"',notIn:["string"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],folding:{markers:{start:new RegExp("^\\s*#pragma\\s+region\\b"),end:new RegExp("^\\s*#pragma\\s+endregion\\b")}}};exports.conf=e;var t={tokenPostfix:".rust",defaultToken:"invalid",keywords:["as","box","break","const","continue","crate","else","enum","extern","false","fn","for","if","impl","in","let","loop","match","mod","move","mut","pub","ref","return","self","static","struct","super","trait","true","type","unsafe","use","where","while","catch","default","union","static","abstract","alignof","become","do","final","macro","offsetof","override","priv","proc","pure","sizeof","typeof","unsized","virtual","yield"],typeKeywords:["Self","m32","m64","m128","f80","f16","f128","int","uint","float","char","bool","u8","u16","u32","u64","f32","f64","i8","i16","i32","i64","str","Option","Either","c_float","c_double","c_void","FILE","fpos_t","DIR","dirent","c_char","c_schar","c_uchar","c_short","c_ushort","c_int","c_uint","c_long","c_ulong","size_t","ptrdiff_t","clock_t","time_t","c_longlong","c_ulonglong","intptr_t","uintptr_t","off_t","dev_t","ino_t","pid_t","mode_t","ssize_t"],constants:["true","false","Some","None","Left","Right","Ok","Err"],supportConstants:["EXIT_FAILURE","EXIT_SUCCESS","RAND_MAX","EOF","SEEK_SET","SEEK_CUR","SEEK_END","_IOFBF","_IONBF","_IOLBF","BUFSIZ","FOPEN_MAX","FILENAME_MAX","L_tmpnam","TMP_MAX","O_RDONLY","O_WRONLY","O_RDWR","O_APPEND","O_CREAT","O_EXCL","O_TRUNC","S_IFIFO","S_IFCHR","S_IFBLK","S_IFDIR","S_IFREG","S_IFMT","S_IEXEC","S_IWRITE","S_IREAD","S_IRWXU","S_IXUSR","S_IWUSR","S_IRUSR","F_OK","R_OK","W_OK","X_OK","STDIN_FILENO","STDOUT_FILENO","STDERR_FILENO"],supportMacros:["format!","print!","println!","panic!","format_args!","unreachable!","write!","writeln!"],operators:["!","!=","%","%=","&","&=","&&","*","*=","+","+=","-","-=","->",".","..","...","/","/=",":",";","<<","<<=","<","<=","=","==","=>",">",">=",">>",">>=","@","^","^=","|","|=","||","_","?","#"],escapes:/\\([nrt0\"''\\]|x\h{2}|u\{\h{1,6}\})/,delimiters:/[,]/,symbols:/[\#\!\%\&\*\+\-\.\/\:\;\<\=\>\@\^\|_\?]+/,intSuffixes:/[iu](8|16|32|64|128|size)/,floatSuffixes:/f(32|64)/,tokenizer:{root:[[/[a-zA-Z][a-zA-Z0-9_]*!?|_[a-zA-Z0-9_]+/,{cases:{"@typeKeywords":"keyword.type","@keywords":"keyword","@supportConstants":"keyword","@supportMacros":"keyword","@constants":"keyword","@default":"identifier"}}],[/\$/,"identifier"],[/'[a-zA-Z_][a-zA-Z0-9_]*(?=[^\'])/,"identifier"],[/'\S'/,"string.byteliteral"],[/"/,{token:"string.quote",bracket:"@open",next:"@string"}],{include:"@numbers"},{include:"@whitespace"},[/@delimiters/,{cases:{"@keywords":"keyword","@default":"delimiter"}}],[/[{}()\[\]<>]/,"@brackets"],[/@symbols/,{cases:{"@operators":"operator","@default":""}}]],whitespace:[[/[ \t\r\n]+/,"white"],[/\/\*/,"comment","@comment"],[/\/\/.*$/,"comment"]],comment:[[/[^\/*]+/,"comment"],[/\/\*/,"comment","@push"],["\\*/","comment","@pop"],[/[\/*]/,"comment"]],string:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,{token:"string.quote",bracket:"@close",next:"@pop"}]],numbers:[[/(0o[0-7_]+)(@intSuffixes)?/,{token:"number"}],[/(0b[0-1_]+)(@intSuffixes)?/,{token:"number"}],[/[\d][\d_]*(\.[\d][\d_]*)?[eE][+-][\d_]+(@floatSuffixes)?/,{token:"number"}],[/\b(\d\.?[\d_]*)(@floatSuffixes)?\b/,{token:"number"}],[/(0x[\da-fA-F]+)_?(@intSuffixes)?/,{token:"number"}],[/[\d][\d_]*(@intSuffixes?)?/,{token:"number"}]]}};exports.language=t;
},{}]},{},["cYYK"], null)
//# sourceMappingURL=/coffeebook/rust.47966e0d.js.map