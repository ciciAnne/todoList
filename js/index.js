//本地localStorage的数据渲染
function renderList () {
  list.innerHTML = '';
  let myList = loadData();
  if (!myList.length) {
    clearAll.style.visibility = "hidden";
    return;
  }
  for (let i in myList) {
    let value = myList[i].value;
    let li = document.createElement('li');
    addLiEvent(li);
    if (!myList[i].checked) {
      li.innerHTML = `<input class='check' type='checkbox' name='check'>`+
      `<input class='list-item' type='text' value='${value}'>`+
      `<span class='delete'>x</span>`;
    } else {
      li.style.opacity = "0.6";
      li.innerHTML = `<input class='check' type='checkbox' name='check' checked>`+
      `<input class='list-item' type='text' value='${value}' style="text-decoration:line-through;">`+
      `<span class='delete'>x</span>`;
    }
    list.appendChild(li);
  }
    // for(let key in localStorage) {
    //   console.log(localStorage[key]);
    // }
}

//加载本地数据
function loadData () {
  if (localStorage.list) {
    return JSON.parse(localStorage.list);
  } else {
    return [];
  }
}

//将添加的数据存到本地
function saveData (data) {
    let collection = loadData();
    collection.push(data);
    localStorage.setItem("list", JSON.stringify(collection));
}

//给待办项li绑定事件
function addLiEvent (li) {
  li.onmouseover = function (e) {
    li.lastChild.style.visibility = "visible";
  };
  li.onmouseout = function (e) {
    li.lastChild.style.visibility = "hidden";
  };
}

//删除单条数据
function deleteAList (e) {
  let myList = loadData();
  for (let i in myList) {
    if (e.value === myList[i].value) {
      myList.splice(i, 1);
      localStorage.list = JSON.stringify(myList);//更新整条数据
      return;
    }
  }
}

let beizhu = document.getElementsByClassName('beizhu')[0];
let addBt = document.getElementsByClassName('bt-add')[0];
let list = document.getElementsByClassName('list')[0];
let clearAll = document.getElementsByClassName('clearAll')[0];

renderList();//读取本地数据

//点击button添加item
addBt.onclick = function(e) {
  let text = beizhu.value.toString();
  console.log(text);
  if (text) {
    let data = {"value": text, "checked": false};
    saveData(data);
    let li = document.createElement('li');
    addLiEvent(li);
    li.innerHTML = `<input class='check' type='checkbox' name='check'>`+ 
    `<input class='list-item' type='text' value='${text}'>`+
    `<span class='delete'>x</span>`;
    list.appendChild(li);
    beizhu.value = "";
    clearAll.style.visibility = "visible";
  }
}

//勾选item时的变化
list.addEventListener('click', function (e) {
  switch(e.srcElement.className) {
    case 'check':
      let myList = loadData();
      for (let i in myList) {
        if (e.srcElement.nextSibling.value === myList[i].value) {
          myList[i].checked = e.srcElement.checked;
          localStorage.list = JSON.stringify(myList);//更新整条数据
          renderList();
          return;
        }
      }
      break;
    case 'delete':
      deleteAList(e.srcElement.previousSibling);
      renderList();
      break;
  }
  
}, false);

//清空所有item
clearAll.onclick = function (e) {
  localStorage.clear();
  renderList();
}
