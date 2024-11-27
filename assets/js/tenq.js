const qType = "multiple";
const qAmount = 10;
const qEncoding = "";
const mainDiv = document.getElementById('main');
const selectDiv = document.getElementById('selection');
const spinner = document.getElementById('fetchSpinner');
const tempDiv = document.getElementById('tempDiv');
const qText = document.getElementById('qText');
const btn1 = document.getElementById('opt1');
const btn2 = document.getElementById('opt2');
const btn3 = document.getElementById('opt3');
const btn4 = document.getElementById('opt4');
const checkModal = document.getElementById('checkModal');
const checkMsg = document.getElementById('checkModalMsg');
const checkImg = document.getElementById('checkModalImg');
const scoreCard = document.getElementById('curScore');
var qIndex = 0;
var qScore = 0;
var qList;
var sessionToken;

async function getNewToken(){
    var curTime = new Date().getTime();
    try{
        const response = await(fetch('https://opentdb.com/api_token.php?command=request'));
        if(!response.ok){
            throw new Error(`Error Ocurred: ${response.status}`);
        }else{
            const data = await response.json();
            if(data['response_code']==0){
                localStorage.setItem('tenqToken',data['token']);
                localStorage.setItem('tenqStart',curTime);
            }else{
                alert(data['response_message']);
                return;
            }
        }
    }catch(error){
        console.error('Error fetching data',error);
    }
}


async function checkToken(){
    var curTime = new Date().getTime();
    if(localStorage.getItem('tenqToken')!==null){
        var tokenTime = new Date(parseInt(localStorage.getItem('tenqStart'),10));
        if((curTime-tokenTime)<21600000){
            localStorage.setItem('tenqStart',curTime);
        }else{
            await getNewToken();
        }
    }else{
        await getNewToken();
}
sessionToken = await localStorage.getItem('tenqToken');
}




function randomizer(array){
    const length = array.length;
    var randArray = [];
    for(let i=0;i<length;i++){
        var curLength = array.length;
        var x = Math.floor(Math.random()*curLength);
        randArray.push(array[x]);
        array.splice(x,1);
    }
    return randArray;
}



function showModal(myModal){
    myModal.classList.add('show');
    document.body.classList.add('modal-backdrop','show');
}

function decode(data){
    tempDiv.innerHTML = data;
    return(tempDiv.textContent);
}
function shuffle(array){
    return array;
}

function updateQuestion(index,list){
    qText.innerHTML = decode(list[index]['question']);
    var choices = list[index]['incorrect_answers'];
    choices.push(list[index]['correct_answer']);
    var randChoices = randomizer(choices);
    btn1.innerHTML = decode(randChoices[0]);
    btn2.innerHTML = decode(randChoices[1]);
    btn3.innerHTML = decode(randChoices[2]);
    btn4.innerHTML = decode(randChoices[3]);
}


function raiseModal(isCorrect,answer){
if(isCorrect){
checkModal.classList.remove('bg-danger');    
checkModal.classList.add('bg-success');
checkMsg.innerHTML = `${answer} is correct!`;
checkImg.setAttribute('src','assets/img/tenq-right.png');
}else{
    checkModal.classList.remove('bg-success');   
    checkModal.classList.add('bg-danger');
    checkMsg.innerHTML = `Wrong answer, "${answer}" is the right option!`
    checkImg.setAttribute('src','assets/img/tenq-wrong.png');
}
checkModal.classList.add('show');
checkModal.style.display = 'block';
}

function closeModal(){
    checkModal.classList.remove('show');
    checkModal.style.display = 'none';
}

function checkAnswer(event){
    if(qIndex < 9){
    if(event.target.innerHTML == decode(qList[qIndex]['correct_answer'])){
        qScore++;
        raiseModal(true,event.target.innerHTML);
    }else{
        raiseModal(false,decode(qList[qIndex]['correct_answer']));
    }
    scoreCard.innerHTML = `${qScore}/${qIndex+1}`;
    qIndex++;
    updateQuestion(qIndex,qList);
}else{
    if(event.target.innerHTML == decode(qList[qIndex]['correct_answer'])){
        qScore++;
        raiseModal(true,event.target.innerHTML);
    }else{
        raiseModal(false,decode(qList[qIndex]['correct_answer']));
    }
    scoreCard.innerHTML = `${qScore}/${qIndex+1}`;
    qIndex++;
    switch(true){
        case qScore<6:{
            selectDiv.innerHTML = `
            <h1>Your Final Score is ${qScore}/10</h1>
            <img src='assets/img/kbc-bad.gif'>
            <div>
            <button class="btn btn-primary" onClick="location.reload()">Take One More Quiz</button>
            </div>
            `;
            break;
        };
        case qScore==10:{
            selectDiv.innerHTML = `
            <h1>Your Final Score is ${qScore}/10</h1>
            <img src='assets/img/kbc-adbhut.gif'><br>
            <div>
            <button class="btn btn-primary" onClick="location.reload()">Take One More Quiz</button>
            </div>
            `;
            break;
        };
        case qScore>5:{
            selectDiv.innerHTML = `
            <h1>Your Final Score is ${qScore}/10</h1>
            <img src='assets/img/kbc-good.gif'>
            <div>
            <button class="btn btn-primary" onClick="location.reload()">Take One More Quiz</button>
            </div>
            `;
            break;
        };
    };
    selectDiv.classList.add('text-white');
    selectDiv.style.display = 'block';
    mainDiv.style.display = 'none';
}
}
async function startQuiz(event){
    spinner.style.display = 'block';
    event.preventDefault();
    var quizStartData = new FormData(event.target);
    var difficulty = quizStartData.get('level');
    var category = quizStartData.get('topic');
    try{
        const response = await(fetch(`https://opentdb.com/api.php?amount=${qAmount}&token=${sessionToken}&category=${category}&difficulty=${difficulty}&type=${qType}`));
        if(!response.ok){
            throw new Error(`Server Error Occured! error code:${response.status}`);
        }else{
            var resData = await response.json();
            if (resData['response_code'] == 0){
                qList = await resData['results'];
                updateQuestion(qIndex,qList);
                selectDiv.style.display = 'none';
                mainDiv.style.display = 'block';
             }else{
                alert('Oops, something went wrong! Please try after sometime!!');
                // location.reload();
            }
        }
    }catch(error){
        console.error('Error fetching data',error);
        alert('Oops, something went wrong! Please try after sometime!!');
        // location.reload();
    }finally{
        spinner.style.display = 'none';
    }
}


checkToken();