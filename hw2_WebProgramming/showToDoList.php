<?php
$count = 0;
session_start();
$id = $_SESSION['ID'];
function showList($id,$category){
global $count;
$file;
if($file = fopen("./data/".$id."_".$category.".txt","r")){
$txt = "";
while(!feof($file)){
$fr = trim(fgets($file));
if($fr != ""){
$token = explode('|',$fr);
$txt = $txt."<li id='".$count."' draggable='true' ondragstart='drag(event)'>".$token[0]."(".$token[1]."~".$token[2].")"."
<span class='remov' onclick='removeData()' >&times;</span>
</li>";
$count++;
}
}
fclose($file);
echo $txt;
}
}
?>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>to-do-list</title>
  <link rel="stylesheet" href="./WP_201502038.css">
  </head>

  <body>
    <input id="button_submit" type="button" name="" value="추가">
    <input id="button_search" type="button" name="" value="검색">
    <table>
      <tr class="table_head">
        <td class="table_left">가족</td>
        <td class="table_right">학교</td>
      </tr>
      <tr class="table_body">
        <td ondrop='drop(event)' ondragover='allowDrop(event)'>
          <span class="hidden"><?php echo $id ?>_family.txt</span>
          <ul id="f">
          <?php
           $data = "family";
           showList($id,$data);
          ?>
        </ul>
        </td>
        <td ondrop='drop(event)' ondragover='allowDrop(event)'>
            <span class="hidden"><?php echo $id ?>_school.txt</span>
            <ul id="s">
          <?php
           $data = "school";
            showList($id,$data);
            ?>
          </ul>
      </td>
    </tr>
    <tr class="table_head">
      <td class="table_left">여행</td>
      <td class="table_right">운동</td>
    </tr>
    <tr class="table_body">
      <td ondrop='drop(event)' ondragover='allowDrop(event)'>
          <span class="hidden"><?php echo $id ?>_trip.txt</span>
          <ul id="t">
       <?php
         $data = "trip";
          showList($id,$data);
        ?>
      </ul>
      </td>
      <td ondrop='drop(event)' ondragover='allowDrop(event)'>
        <span class="hidden"><?php echo $id ?>_exercise.txt</span>
        <ul id="e">
        <?php
         $data = "exercise";
          showList($id,$data);
        ?>
      </ul>
      </td>
    </tr>
  </table>
<div id="myModal" class="modal">
  <div class="modal-content">
        <form class="" action="http://localhost:8080/WEB_hw2/makeDB.php" method="get">
        <label for="">할 일 목록</label>
        <input list="browsers" name="browsers" value=""> <br /><br />
        <datalist id="browsers">
          <option value="family"></option>
          <option value="school"></option>
          <option value="trip"></option>
          <option value="exercise"></option>
        </datalist>
        <label for="">메모 : </label>
        <input class="selecter" type="text" name="memo" value=""><br /><br />
        <label for="">시작 날짜 : </label>
        <input class="selecter" type="date" name="startdate" value=""><br /><br />
        <label for="">끝나는 날짜 : </label>
        <input class="selecter" type="date" name="enddate" value=""><br /><br />
        <input class="close" type="submit" name="" value="submit" onclick="list()">
        </form>
        <button class="close">close</span>
      </div>
    </div>
  <div id="myModal1" class="modal">
      <div class="modal-content">
          <label for="">메모 키워드 : </label>
          <input id='mk' class="find" type="text" name="memo" value="" formaction="findDB.php"><br /><br />
          <label for="">시작 날짜 : </label>
          <input id='sd' class="find" type="date" name="startdate" value="" formaction="findDB.php"><br /><br />
          <label for="">끝나는 날짜 : </label>
          <input id='ed' class="find" type="date" name="enddate" value="" formaction="findDB.php"><br /><br />
          <input id='nr' type="checkbox" name="내림차순" value=""> 내림차순
          <input id='or' type="checkbox" name="오름차순" value=""> 오름차순
          <input class="close" type="submit" name="" value="submit" onclick="find()">
          <button class="close">close</span>
      </div>
  </div>
  <div id="searchlist">
  </div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="./WP_201502038.js">
</script>
  </body>
  </html>
