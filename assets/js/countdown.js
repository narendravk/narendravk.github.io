if(localStorage.getItem('eventBG')!==null){
    let pagebody = document.getElementsByClassName('page-wrap');
    pagebody[0].style.backgroundImage = `url(${localStorage.getItem('eventBG')})`;
}


function createCountdown(){
    var formDiv = document.getElementById('form-control');
    formDiv.style.display = "none";
    var spinner = document.getElementById('spinner');
    spinner.style.display = "block";
    var eTitle = document.getElementById('eventTitle');
    var header = document.getElementById('heading');
    header.innerHTML = eTitle.value;
    var eDate = new Date(document.getElementById('eventDate').value).getTime();
    var now = new Date().getTime();
    if (eDate < now){
        alert("Event date & time must be greater than current date & time!");
        location.reload();
    } else{
        localStorage.setItem('cdEventTitle',eTitle.value);
        localStorage.setItem('cdEventDate',document.getElementById('eventDate').value)
        const dp = document.getElementById('dp');
        const hp = document.getElementById('hp');
        const mp = document.getElementById('mp');
        const sp = document.getElementById('sp');
    setInterval(()=>{
        var today = new Date().getTime();
        var timDeltaMilsec = Math.abs(eDate- today);
        var remDays =(timDeltaMilsec/(1000*60*60*24));
        var remHrs = (remDays - Math.floor(remDays))*24 ;
        var remMins = (remHrs - Math.floor(remHrs))*60;
        var remSec = (remMins - Math.floor(remMins))*60;
        dp.innerHTML = Math.floor(remDays);
        hp.innerHTML = Math.floor(remHrs);
        mp.innerHTML = Math.floor(remMins);
        sp.innerHTML = Math.floor(remSec);
    })
    
}
}

function changeEventBG(){
    var eventBG = document.getElementById('eventBG');
    if (eventBG.value !== ""){
        localStorage.setItem('eventBG',eventBG.value);
        location.reload();
    }else{
        alert("⚠️Please eneter a non empty and valid value..");
    }
}

function resetLocal(){
    localStorage.clear();
    alert("All app data reset succesfully!");
    location.reload();
}

function checkLocalData(){
    if (localStorage.getItem('cdEventTitle')!==null && localStorage.getItem('cdEventDate')!==null){
        var eDate = new Date(localStorage.getItem('cdEventDate'));
        var eTitle = localStorage.getItem('cdEventTitle');
        var today = new Date();
        if(eDate > today){
            var header = document.getElementById('heading');
            header.innerHTML = eTitle;
            const dp = document.getElementById('dp');
            const hp = document.getElementById('hp');
            const mp = document.getElementById('mp');
            const sp = document.getElementById('sp');
            var formDiv = document.getElementById('form-control');
            formDiv.style.display = "none";
            var spinner = document.getElementById('spinner');
            spinner.style.display = "block";
            setInterval(()=>{
            var now = new Date().getTime()    
            var timDeltaMilsec = Math.abs(eDate- now);
            var remDays =(timDeltaMilsec/(1000*60*60*24));
            var remHrs = (remDays - Math.floor(remDays))*24 ;
            var remMins = (remHrs - Math.floor(remHrs))*60;
            var remSec = (remMins - Math.floor(remMins))*60;
            dp.innerHTML = Math.floor(remDays);
            hp.innerHTML = Math.floor(remHrs);
            mp.innerHTML = Math.floor(remMins);
            sp.innerHTML = Math.floor(remSec);
        },1000)
        }

    }
}

document.getElementById('contactForm').addEventListener('submit', submitForm);
function submitForm(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const msg     = document.getElementById('fmessage').value.trim();
  if (!name || !email || !msg) { alert('Please fill in the required fields.'); return; }

  const btn = document.querySelector('.form-submit');
  btn.disabled = true;
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.5" stroke-linecap="round"
         style="animation: spin .7s linear infinite; flex-shrink:0">
      <path d="M12 2a10 10 0 0 1 10 10"/>
    </svg>
    Sending…
  `;

  const form     = document.getElementById('contactForm');
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    form.reset();
  })
  .catch(() => {
    btn.disabled = false;
    btn.innerHTML = 'Send Message ✦';
    alert('Something went wrong. Please try again.');
  });
}
