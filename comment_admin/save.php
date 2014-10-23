<?php
if(!$_POST["json"]) {
	error("No input");
}

$fh = fopen('../comments.json', "w");

if(!$fh) { error("couldn't open output file"); }
fwrite($fh, $_POST["json"]);

fclose($fh);

echo "done";

function error($msg) {
	http_response_code (500);
	echo $msg;
	exit;
}