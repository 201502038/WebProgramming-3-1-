var glob;
var glob1
function reset() {
  document.getElementsByClassName('inputText')[0].value = "";
  document.getElementsByClassName('inputText')[1].value = "";
}
  var modal = document.getElementById("myModal");
  var modal1 = document.getElementById("myModal1");
  // Get the button that opens the modal
  var btn = document.getElementById("button_submit");
  var btn1 = document.getElementById("button_search");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[1];
  var span1 = document.getElementsByClassName("close")[3];
  var span2 = document.getElementsByClassName("remov");
  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }
  btn1.onclick = function() {
    modal1.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  span1.onclick = function() {
    modal1.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
function removeData(){
  var a = event.target.parentNode;
  //var index = $(a).index() - 1;
  var b = a.parentNode;
  var c = b.parentNode;
  var filename = c.childNodes[1].innerHTML;
  filename = "./data/"+filename;
  var d = c.childNodes[4];
  b.removeChild(a);
  console.log(a);
  console.log(b);
  var txt1 = '';
  var regExp = /(<([^>]+)>)/ig;
  if (b.childNodes.length == 0 ){
    console.log(b.childNodes.length);
    txt1 = '';
  }
  else{
    var txt;
    for (variable of b.childNodes) {
      if (variable.tagName == 'LI'){
      txt = variable.innerHTML.replace(regExp,"").slice(0,-1);
      txt = txt.replace(/\n/g,"").slice(0,-1);
      console.log(txt);
      txt = txt.replace('(','|');
      console.log(txt);
      txt = txt.replace(')','');
      console.log(txt);
      txt = txt.replace('~','|');
      console.log(txt);
      txt = txt + "\r\n";
      txt1 += txt;
    }
    }
  }
  $.post("changeDB.php", { filename: filename , txt: txt1 }, function() { });
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  glob = ev.target.parentNode.id;
  glob1 = ev.target.parentNode.id;
}
function where(ev){
  var c = 0;
  evP = ev.parentNode;
  for (variable of evP.childNodes) {
    if (ev === variable){
      return c;
    }
    c++;
  }
}
function drop(ev) {

  ev.preventDefault();
  var newTag;
  var filename;
  var data = ev.dataTransfer.getData("text");
  if (ev.target.tagName == 'LI'){
    newTag = ev.target.parentNode;
    filename = ev.target.parentNode.parentNode.childNodes[1].innerHTML;
  var a = where(ev.target);
  console.log(document.getElementById(data));
  console.log(ev.target.parentNode.childNodes[a]);
  ev.target.parentNode.insertBefore(document.getElementById(data),ev.target.parentNode.childNodes[a+1])

  }
  else if (ev.target.tagName == 'UL'){
    newTag = ev.target;
    filename = ev.target.parentNode.childNodes[1].innerHTML;
  ev.target.appendChild(document.getElementById(data));
  }
  else{
    newTag = ev.target.childNodes[3];
    filename = ev.target.childNodes[1].innerHTML;
  ev.target.childNodes[3].appendChild(document.getElementById(data));
  }

  filename = "./data/"+filename;
  var txt1 = '';
  var regExp = /(<([^>]+)>)/ig;
  if (newTag.childNodes.length == 0 ){
    txt1 = '';
  }
  else{
    var txt;
    for (variable of newTag.childNodes) {
      if (variable.tagName == 'LI'){
      txt = variable.innerHTML.replace(regExp,"").slice(0,-1);
      txt = txt.replace(/\n/g,"").slice(0,-1);
      txt = txt.replace('(','|');
      txt = txt.replace(')','');
      txt = txt.replace('~','|');
      txt = txt + "\r\n";
      txt1 += txt;
    }
    }
  }
  $.post("changeDB.php", { filename: filename , txt: txt1 }, function() { });
  myfunc();
}
function myfunc(){
  reTag = document.getElementById(String(glob1));
  refilename = document.getElementById(String(glob)).parentNode.childNodes[1].innerHTML;

  refilename = "./data/"+refilename;
  var txt1 = '';
  var regExp =  /(<([^>]+)>)/ig;
  if (reTag.childNodes.length == 0 ){
    txt1 = '';
  }
  else{
    var txt;
    for (variable of reTag.childNodes) {
      if (variable.tagName == 'LI'){
      txt = variable.innerHTML.replace(regExp,"").slice(0,-1);
      txt = txt.replace(/\n/g,"").slice(0,-1);
      txt = txt.replace('(','|');
      txt = txt.replace(')','');
      txt = txt.replace('~','|');
      txt = txt + "\r\n";
      txt1 += txt;
    }
    }
  }
  $.post("changeDB.php", { filename: refilename , txt: txt1 }, function() { });
}
function find(){
   function search(_memo,_startdate,_enddate){
     this.memo = _memo;
     this.startdate = _startdate;
     this.enddate = _enddate;
   }
  var patten = /(<([^>]+)>)/ig;
  var li = document.getElementsByTagName('li');
  var arr = new Array();
  for (variable of li) {
    var val = variable.innerHTML.replace(patten,"").slice(0,-1);;
    val = val.replace(/\n/g,"").slice(0,-1);
    var data = val.split(/[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi);
    var s = new search(data[0],data[1],data[2]);
    arr.push(s);
  }
  //메모키워드
  result = new Array();
  var mk = document.getElementById('mk').value;
  //시작 날짜
  var sd = document.getElementById('sd').value;
  // 마감 날짜
  var ed = document.getElementById('ed').value;
  var or = document.getElementById('or');
  //날짜값이 없을 경우 디폴트값
  if (sd == ''){
    sd = "0000-01-01";
  }
  if (ed == ''){
    ed = "9999-12-31";
  }
  for (variable of arr) {
    temp = variable.memo.indexOf(mk);
    if (mk == ''){
      temp = 0;
    }
    if(temp == 0 & (variable.startdate >= sd) & (variable.enddate <= ed)){
      result.push(variable);
    }
  }
if(or.checked == true){//오름차순의 경우
  result.sort(function(a,b){
    return a.memo < b.memo ? -1 : a.memo > b.memo ? 1 : 0;
  });
}
else{ //내림차순의 경우
  result.sort(function(a,b){
    return a.memo > b.memo ? -1 : a.memo < b.memo ? 1 : 0;
  });
}
var se = document.getElementById('searchlist');
while ( se.hasChildNodes() ) {
  se.removeChild( se.firstChild );
}
for (variable of result) {
  console.log(result);
  var li = document.createElement('div');
  var txt = document.createTextNode(String(variable.memo)+"("+String(variable.startdate)+"~"+String(variable.enddate)+")");
  li.appendChild(txt);
  se.appendChild(li);
}
for (variable of result) {
  result.pop();
}
}
