<?php
session_start();
$filename = $_POST['filename'];
$txt = $_POST['txt'];
echo $txt;
$file = fopen($filename, "w+");
fwrite($file, $txt);
fclose($file);
?>
