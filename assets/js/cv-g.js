//© Narendra Kashikar 2024
//For more info, visit me at https://narendravk.github.io

function getText(pre,opid,inid){
    let opComponent = document.getElementById(opid);
    opComponent.innerHTML = pre + document.getElementById(inid).value;
}

function getImage(opid,inid){
    let opComponent = document.getElementById(opid);
    opComponent.setAttribute('src', document.getElementById(inid).value);
}

function changeImgStyle(){
    let photo = document.getElementById('op-photo');
    if (photo.classList.contains('rounded')){
        photo.classList.remove('rounded');
        photo.classList.add('rounded-circle');
    } else {
        if(photo.classList.contains('rounded-circle')){
        photo.classList.remove('rounded-circle');
        photo.classList.add('rounded')
    }
}}

//check form validity on focus change use fn on onblur event
function reportIfValid(){
    let form = document.querySelector('form');
    form.reportValidity();
}

function addEducation(event){
    event.preventDefault();
    var formData = new FormData(event.target);
    var education = formData.get('education');
    var degree = formData.get('degree');
    var college = formData.get('college');
    var passing = formData.get('passing').slice(0,4);
    var score = formData.get('score');
    var newRow = document.createElement('tr'); // this is a node
    var rowContent = `
        <td>${education}</td>
        <td>${degree}</td>
        <td>${college}</td>
        <td>${passing}</td>
        <td>${score}</td>`;
    newRow.innerHTML = rowContent;    
    var eduTbody = document.getElementById('eduTbody');
    eduTbody.appendChild(newRow);
}

function hideSidebar(){
    sidebar = document.getElementById('sidebar');
    workspace = document.getElementById('workspace');
    if(workspace.classList.contains('col-8')){
    sidebar.style.display = 'none';
    workspace.classList.remove('col-8');
    
}else{
    sidebar.style.display = 'block';
    workspace.classList.remove('col-12');
    workspace.classList.add('col-8');
}}