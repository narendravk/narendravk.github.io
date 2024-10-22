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

function addExperience(event){
    event.preventDefault();
    var formData = new FormData(event.target);
    var company = formData.get('company');
    var from_dt = formData.get('from_dt');
    var to_dt = formData.get('to_dt');
    var desg = formData.get('designation');
    var details = formData.get('role_jd');
    var newCard = document.createElement('div'); // this is a node
    var cardContent = `
    <div class="card-header font-weight-bold">${company}</div>
    <div class="card-text text-muted font-weight-italic">${from_dt} to ${to_dt}</div>
    <div class="card-body"><h6 class="card-title">${desg}</h6>
    <p class="card-text">${details}</p></div>
    `;                            
    newCard.innerHTML = cardContent;
    newCard.classList.add('card');
    newCard.classList.add('flex-child');
    newCard.classList.add('text-start'); 
    newCard.style.pageBreakInside = 'avoid';   
    var expDiv = document.getElementById('exp-div');
    expDiv.appendChild(newCard);
}


function hideSidebar(){
    sidebar = document.getElementById('sidebar');
    workspace = document.getElementById('workspace');
    if(sidebar.style.display!='none'){
    sidebar.style.display = 'none';
    workspace.style.paddingLeft = '40px';
    }else{
        sidebar.style.display='block';
        workspace.style.paddingLeft = '280px';
    }
}

function updateFont(event){
    workspsace = document.getElementById('workspace');
    fontSelect = document.getElementById('font-select');
    const options = fontSelect.options;
    for(let i =0; i<options.length; i++){
        if(workspace.classList.contains(options[i].value)){
            workspace.classList.remove(options[i].value);
        };
    };
    workspace.classList.add(event.target.value);
}

function printResume()
{
    window.print();
 }