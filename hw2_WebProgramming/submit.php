<?php
$id = $_GET['ID'];
$password = $_GET['PASSWORD'];
$file = fopen("./data/person.txt","r");
  $infoArray = array();
  while(!feof($file)){
  $key = rtrim(fgets($file));
  $value = rtrim(fgets($file));
  $infoArray[$key] = $value;
}
fclose($file);
foreach($infoArray as $key => $value){
   if(strcmp($key, $id) === 0 && strcmp($value, $password) === 0){
   session_start();
   $_SESSION['ID'] = $id;
   echo "접속성공to-do-list.";
   header("Location: ./showToDoList.php");
   exit();
   }
   if(strcmp($key, $id) === 0){echo "패스워드가 틀립니다.";exit();}
}
echo "존재하지 않는 아이디입니다.";
?>
