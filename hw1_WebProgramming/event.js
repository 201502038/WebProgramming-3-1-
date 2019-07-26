//달력상단에 날짜를 표시
var _TagNumber = 0;
var date = new Date();
var result = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월"
var d = document.getElementById('date');
d.innerHTML = " " + result + " ";
//달력에 날짜를 표시
//var day = date.getDay();
//요일은 0-6까지의 수로 표현 가능
var tdTag = document.getElementsByTagName('td');
var startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
var count = 1;
for (var i = startDay; i < fn_DayOfMonth(date.getFullYear(), date.getMonth() + 1) + startDay; i++) {
  var spanTag = document.createElement('span');
  var dateNum = document.createTextNode(count);
  spanTag.appendChild(dateNum);
  if (date.getDate() == count) {
    tdTag[i].style.background = "#96e3ff";
    tdTag[i].addEventListener("dblclick", myFunction, false);
  } else if (date.getDate() >= count) {
    tdTag[i].style.background = "#e3e4ea";
  } else {
    tdTag[i].style.background = "#d9e8ce";
    tdTag[i].addEventListener("dblclick", myFunction, false);
  }
  tdTag[i].appendChild(spanTag);
  count++;
}
//월의 일수를 구하는 함수
function fn_DayOfMonth(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}
//일정추가 시나리오작성 더블클릭시 반응
function myFunction() {
  var tdevent = event.target;
  var value = tdevent.getElementsByTagName('span')[0].innerHTML;
  modalBox(value);
  var modal = document.getElementById('modal');
  // Get the <span> element that closes the modal
  var add = document.getElementsByClassName("open")[0];
  var cancel = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  var content = document.getElementsByClassName("modal-content")[0];
  content.onclick = function() {
    event.stopPropagation();
  }
  modal.onclick = function() {
    modal.style.display = "none";
  }
  cancel.onclick = function() {
    modal.style.display = "none";
  }
  add.onclick = function() {
    modal.style.display = "none";
    var task = document.createElement('div');
    var _task = document.createElement('input');
    task.className = 'task';
    _task.id = '_task';
    var input = document.getElementById('go');
    var text = document.createTextNode(input.value);
    //var inputText = document.getElementById('_task');
    _task.value = input.value;
    task.appendChild(_task);
    var del = document.createElement('span');
    del.id = 'del';
    del.innerHTML = '&times;';
    del.addEventListener("click", modalbox, true);
    task.appendChild(del);
    //task.appendChild(inputTag);
    tdevent.appendChild(task);
    task.onclick = function() {
      event.stopPropagation();
    }
  }
}

//일정추가 modalBox구현
function modalBox(value) {
  var modalBox = document.getElementById('modalBox');
  modalBox.innerHTML =
    '<div id="modal">' +
    '<div class="modal-content">' +
    '<p>' + value + '일 일정추가</p>' +
    '<input id="go" "type="text" name="" value=""><br/>' +
    '<button type="button" name="button" class="open">Add</button>' +
    '<button type="button" name="button" class="close">Cancel</button>' +
    '</div>' +
    '</div>';
}
//일정변경 함수 구현
function modalbox() {
  var modalbox = document.getElementById('modalbox');
  var realb = event.target.parentNode;
  var a = event.target.parentNode.parentNode.getElementsByTagName('span')[0].innerHTML;
  var date = new Date();
  var result = getFormatDate(date, a);
  //일정 목록을 가지고 옴
  var b = event.target.parentNode.parentNode.getElementsByTagName('div');
  var childNum = b.length;
  var number;
  for (var i = 0;; i++) {
    if (realb == b[i]) {
      number = i;
      break;
    }
  }
  var eventDiv = b[number];
  modalbox.innerHTML =
    '<div id="modal1">' +
    '<div class="modal-content1">' +
    '<p id="change">일정변경</p>' +
    '일정 날짜 변경: <input id="go1" type="date" name="" value="' + String(result) +
    '"><br/>' +
    '일정 순서 변경: <input id="go2" type="number" name="" value="' + String(number + 1) +
    '" min="1" max="'+String(childNum)+'"><br/>'+
    '<button type="button" name="button" class="open1">save</button>' +
    '<button type="button" name="button" class="close1">delete</button>' +
    '</div>' +
    '</div>';
  resetTask(eventDiv, result);
  var value = document.getElementById('Text');
  value.style.display = "none";
}

function resetTask(eventDiv, result) {
  var modal = document.getElementById('modal1');
  // Get the <span> element that closes the modal
  var save = document.getElementsByClassName("open1")[0];
  var delet = document.getElementsByClassName("close1")[0];
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  var content = document.getElementsByClassName("modal-content1")[0];
  //일정변경시나리오를 위한 코드
  var changenu = document.getElementById('go2');
  var changeda = document.getElementById('go1');
  var flag = true;
  changeda.onchange = function() {
    if (changeda.value != result) {
      changenu.disabled = 'disabled';
      changenu.style.background = 'lightgray';
      flag = false;
    } else {
      changenu.disabled = false;
      changenu.style.background = 'white';
      flag = true;
    }
  }
  content.onclick = function() {
    event.stopPropagation();
  }
  modal.onclick = function() {
    modal.style.display = "none";
  }
  delet.onclick = function() {
    modal.style.display = "none";
    var eventDivP = eventDiv.parentNode;
    eventDivP.removeChild(eventDiv);
  }
  save.onclick = function() {
    if (flag) {
      modal.style.display = "none";
      var eventDivP = eventDiv.parentNode;
      var temp = eventDiv;
      var i = getChildNumber(temp);
      eventDivP.removeChild(eventDiv);
      var newNum = (document.getElementById('go2').value) - 1;
      //var div = document.getElementsByTagName('div');
      parent = eventDiv.parentNode;
      var div = eventDivP.getElementsByClassName('task');
      if (i > newNum + 1)
        eventDivP.insertBefore(temp, div[newNum]);
      else {
        eventDivP.appendChild(temp);
        eventDivP.insertBefore(eventDivP.lastChild, div[newNum]);
      }
    } else {
      var newDate = new Date(changeda.value);
      if (newDate.getMonth() != date.getMonth() || newDate.getFullYear() != date.getFullYear()) {
        alert("이번 달이 아닌 날로 이동이 불가능합니다.");
      } else if (newDate.getDate() < date.getDate()) {
        alert("지난 날로 이동이 불가능합니다.");
      } else {
        modal.style.display = "none";
        var eventDivP = eventDiv.parentNode;
        var temp = eventDiv;
        eventDivP.removeChild(eventDiv);
        var goto = newDate.getDate();
        var _tdTag = document.getElementsByTagName('td');
        var _startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        var where = goto + startDay - 1;
        _tdTag[where].appendChild(eventDiv);
      }
    }
  }
}

function getChildNumber(node) {
  return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}

function getFormatDate(date, day) {
  var year = date.getFullYear(); //yyyy
  var month = (1 + date.getMonth()); //M
  month = month >= 10 ? month : '0' + month; // month 두자리로 저장
  day = day >= 10 ? day : '0' + day; //day 두자리로 저장
  return year + '-' + month + '-' + day;
}
