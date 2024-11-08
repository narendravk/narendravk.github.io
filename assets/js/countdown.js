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
