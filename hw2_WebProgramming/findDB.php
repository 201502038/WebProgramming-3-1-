<?php
  //메모키워드 + 시작날짜 + 종료날짜 + ID
  $memo = $_GET['memo'];
  $startDate = $_GET['startdate'];
  $endDate = $_GET['enddate'];
  session_start();
  $id = $_SESSION['ID'];
  $file;
  $txt = "<ul>";
  if($file = fopen("./data/".$id."_family.txt","r")){
  //파일을 열음
  while(!feof($file)){
  $fr = trim(fgets($file));
  if($fr != ""){
  $token = explode('|',$fr);
  $target1 = strtotime($startDate);
  $target2 = strtotime($token[1]);
  $_target1 = strtotime($endDate);
  $_target2 = strtotime($token[2]);
  $temp = (strpos($memo,$token[0]) !== false);
  if($startDate == ''){
    $target1 = strtotime(00000101);
  }
  if($endDate == ''){
    $_target1 = strtotime(99991231);
  }
  if($memo == ''){
    $temp = 1;
  }
  if($temp & ($target1 <= $target2) & ($_target1 >= $_target2) ){
  $txt = $txt."<li>".$token[0]."(".$token[1]."~".$token[2].")"."</li>";
  }
  }
  }
  fclose($file);
  }

  if($file = fopen("./data/".$id."_trip.txt","r")){
  //파일을 열음
  while(!feof($file)){
  $fr = trim(fgets($file));
  if($fr != ""){
  $token = explode('|',$fr);
  $target1 = strtotime($startDate);
  $target2 = strtotime($token[1]);
  $_target1 = strtotime($endDate);
  $_target2 = strtotime($token[2]);
  $temp = (strpos($memo,$token[0])!== false);
  if($startDate == ''){
    $target1 = strtotime(00000101);
  }
  if($endDate == ''){
    $_target1 = strtotime(99991231);
  }
  if($memo == ''){
    $temp = 1;
  }
  if( $temp & ($target1 <= $target2) & ($_target1 >= $_target2) ) {
  $txt = $txt."<li>".$token[0]."(".$token[1]."~".$token[2].")"."</li>";
  }
  }
  }
  fclose($file);
  }
  if($file = fopen("./data/".$id."_exercise.txt","r")){
  //파일을 열음
  while(!feof($file)){
  $fr = trim(fgets($file));
  if($fr != ""){
  $token = explode('|',$fr);
  $target1 = strtotime($startDate);
  $target2 = strtotime($token[1]);
  $_target1 = strtotime($endDate);
  $_target2 = strtotime($token[2]);
  $temp = (strpos($memo,$token[0])!== false);
  if($startDate == ''){
    $target1 = strtotime(00000101);
  }
  if($endDate == ''){
    $_target1 = strtotime(99991231);
  }
  if($memo == ''){
    $temp = 1;
  }
  if($temp & ($target1 <= $target2) & ($_target1 >= $_target2) ){
  $txt = $txt."<li>".$token[0]."(".$token[1]."~".$token[2].")"."</li>";
  }
  }
  }
  fclose($file);
  }
  if($file = fopen("./data/".$id."_school.txt","r")){
  //파일을 열음
  while(!feof($file)){
  $fr = trim(fgets($file));
  if($fr != ""){
  $target1 = strtotime($startDate);
  $target2 = strtotime($token[1]);
  $_target1 = strtotime($endDate);
  $_target2 = strtotime($token[2]);
  $token = explode('|',$fr);
  $temp = (strpos($memo,$token[0])!== false);
  if($startDate == ''){
    $target1 = strtotime(00000101);
  }
  if($endDate == ''){
    $_target1 = strtotime(99991231);
  }
  if($memo == ''){
    $temp = 1;
  }
  if($temp & ($target1 <= $target2) & ($_target1 >= $_target2) ){
  $txt = $txt."<li>".$token[0]."(".$token[1]."~".$token[2].")"."</li>";
  }
  }
  }
  fclose($file);
  $txt = $txt."</ul>";
  }
  session_start();
  $_SESSION['txt'] = $txt;
  header("Location: ./showToDoList.php");
?>
