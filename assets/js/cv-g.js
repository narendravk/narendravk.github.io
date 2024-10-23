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
    var form = document.getElementById('eduForm');
    form.reset();
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
    var form = document.getElementById('expForm');
    form.reset();
}

function addSkill(event){
    event.preventDefault();
    var formData = new FormData(event.target);
    var skillName = formData.get('skillName');
    var skillLevel = formData.get('skillLevel');
    var newSkillDiv = document.createElement('div'); // this is a node
    var skillDivContent = `
    <li class="m-1">${skillName}</li>
    <div class="progress" style="height:20px;">
    <div class="progress-bar text-dark" role="progressbar" style="width: ${skillLevel}%" aria-valuenow="${skillLevel}" aria-valuemin="0" aria-valuemax="100"><strong>${skillLevel}%</strong></div>
    </div>
    `;                            
    newSkillDiv.innerHTML = skillDivContent;      
    var skillSetDiv = document.getElementById('skillset');
    skillSetDiv.appendChild(newSkillDiv);
    var form = document.getElementById('skillForm');
    form.reset();
}


function addBullet(event,inputName,outputId,formId){
    event.preventDefault();
    var formData = new FormData(event.target);
    var content = formData.get(`${inputName}`);
    var newBullet = document.createElement('li'); // this is a node                      
    newBullet.innerHTML = content;
    newBullet.classList.add('m-1');     
    var outputDiv = document.getElementById(`${outputId}`);
    outputDiv.appendChild(newBullet);
    var form = document.getElementById(formId);
    form.reset();
}

function hideSidebar(event){
    sidebar = document.getElementById('sidebar');
    workspace = document.getElementById('workspace');
    const toggleButton = event.target;
    if(sidebar.style.display!='none'){
    sidebar.style.display = 'none';
    workspace.style.paddingLeft = '40px';
    toggleButton.innerHTML = 'Show Sidebar➡️';
    }else{
        sidebar.style.display='block';
        workspace.style.paddingLeft = '280px';
        toggleButton.innerHTML = '⬅️Hide Sidebar';
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