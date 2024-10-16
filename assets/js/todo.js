//To Do App
//Created by Narendra Kashikar. ©2024

if(localStorage.getItem('appBG')!==null){
    let pagebody = document.getElementById('body');
    pagebody.style.backgroundImage = `url(${localStorage.getItem('appBG')})`;
}

if(localStorage.getItem('userName')!==null){
    let nameplate = document.getElementById('username');
    nameplate.innerHTML = localStorage.getItem('userName');
}

if(localStorage.getItem('userDP')!==null){
    let dpFrame = document.getElementById('userimg');
    dpFrame.setAttribute('src',localStorage.getItem('userDP'));
}

function removeItem(i){
    let list1= JSON.parse(localStorage.getItem('toDoList'));
    list1.splice(i,1);
    localStorage.removeItem('toDoList');
    localStorage.setItem('toDoList',JSON.stringify(list1));
    location.reload();
}
 
function deleteAllItems(){
    if(confirm('⚠️Do you really want to delete all tasks in the list??')){
    localStorage.removeItem('toDoList');
    location.reload();
}
}

function changeBG(){
    var appBG = document.getElementById('bgURL');
    if (bgURL !== ""){
        localStorage.setItem('appBG',appBG.value);
        location.reload();
    }else{
        alert("⚠️Please eneter a non empty and valid value..");
    }
}

function changeUserName(){
    var username = document.getElementById('changeusername');
    if (username.value !== ""){
        localStorage.setItem('userName',username.value);
        location.reload();
    }else{
        alert("⚠️Please eneter a non empty and valid value..");
    }
}

function changeUserDP(){
    var profilePic = document.getElementById('profile');
    if (profilePic.value !== ""){
        localStorage.setItem('userDP',profilePic.value);
        location.reload();
    }else{
        alert("⚠️Please eneter a non empty and valid value..");
    }
}

if (localStorage.getItem('toDoList') !== null){
    let toDoArray = JSON.parse(localStorage.getItem('toDoList'));
    if (toDoArray.length > 0){
        var deleteAll = document.getElementById('deleteAll');
        deleteAll.style.display = 'block';
        deleteAll.style.margin = 'auto';
    }
    for (let index = 0; index < toDoArray.length; index++) {
        var trow = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = index+1;
        var td2 = document.createElement("td");
        td2.innerHTML = toDoArray[index].task;
        var td3 = document.createElement("td");
        td3.innerHTML = toDoArray[index].deadline;
        var td4 = document.createElement("td");
        td4.innerHTML = toDoArray[index].priority;
        var btn1 = document.createElement('button');
        btn1.setAttribute('class','btn');
        btn1.setAttribute('onclick',`removeItem(${index})`);
        btn1.innerHTML = '✅'
        var td5 = document.createElement('td');
        td5.appendChild(btn1);
        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);
        document.getElementById('list-body').appendChild(trow);
    }};
function createNewTask(){
    var task = document.getElementById('task').value ;
        if(task !== ""){
        var deadline = document.getElementById('deadline').value ;
        var priority = document.getElementById('priority').value ;
        if (localStorage.getItem('toDoList') !== null){
            let toDoList = localStorage.getItem('toDoList');
            let itemList = JSON.parse(toDoList);
            itemList.push({"task":task,"deadline":deadline,"priority":priority});
            localStorage.removeItem('toDoList');
            localStorage.setItem('toDoList',JSON.stringify(itemList));
            console.log(itemList);
            location.reload();
        } else{
            var listObj = [{"task":task,"deadline":deadline,"priority":priority}];
            localStorage.setItem('toDoList',JSON.stringify(listObj));
            console.log(listObj);
            location.reload();
        }

}else{
    alert("⚠️Please enter task details first..");
}}