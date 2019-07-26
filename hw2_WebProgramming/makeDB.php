<?php
$browser = $_GET['browsers'];
$memo = $_GET['memo'];
$startDate = $_GET['startdate'];
$endDate = $_GET['enddate'];
session_start();
$id = $_SESSION['ID'];

echo $browser;
echo $startDate;
echo $endDate;

$file = fopen("./data/".$id."_"."$browser".".txt","a");
$txt = $memo."|".$startDate."|".$endDate."\n";
fwrite($file,$txt);
fclose($file);
header("Location: ./showToDoList.php");
?>
