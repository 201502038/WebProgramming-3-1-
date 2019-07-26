<?php
class fileinfo {
public $_ID, $_PASSWORD;
function saveinfo(){
$file = fopen("./data/person.txt" ,'a');
fwrite($file,$this->_ID."\n");
fwrite($file,$this->_PASSWORD."\n");
fclose($file);
}
}
$id = $_GET['ID'];
$password = $_GET['PASSWORD'];
if($id =="" || $password==""){
  echo "아이디 또는 패스워드를 입력해주세요.";
  exit();
}
else{
$file = fopen("./data/person.txt","r");
  $infoArray = array();
  while(!feof($file)){
  $key = rtrim(fgets($file));
  $value = rtrim(fgets($file));
  if($key != "" && $value !=""){
    $infoArray[$key] = $value;
     }
     }
     fclose($file);
   foreach($infoArray as $key => $value){
      if(strpos($key, $id) !== false){
      echo "이미존재하는 아이디가 있습니다.";
      exit();
      }
   }
   }
   $object = new fileinfo;
   $object->_ID = $_GET['ID'];
   $object->_PASSWORD = $_GET['PASSWORD'];
   $object->saveinfo();
   echo "성공적으로 저장되었습니다.";
   ?>
