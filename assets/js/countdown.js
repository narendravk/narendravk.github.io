function createCountdown(){
    var formDiv = document.getElementById('form-control');
    formDiv.style.display = "none";
    var spinner = document.getElementById('spinner');
    spinner.style.display = "block";
    var eTitle = document.getElementById('eventTitle');
    var header = document.getElementById('heading');
    header.innerHTML = eTitle.value;
    var eDate = new Date(document.getElementById('eventDate').value).getTime();
    var timer = document.getElementById('timer');
    var now = new Date().getTime();
    if (eDate < now){
        alert("Event date & time must be greater than current date & time!");
        location.reload();
    } else{
    setInterval(()=>{
        var today = new Date().getTime();
        var timDeltaMilsec = Math.abs(eDate- today);
        var remDays =(timDeltaMilsec/(1000*60*60*24));
        var remHrs = (remDays - Math.floor(remDays))*24 ;
        var remMins = (remHrs - Math.floor(remHrs))*60;
        var remSec = (remMins - Math.floor(remMins))*60;
        timer.innerHTML = Math.floor(remDays) + " d " + Math.floor(remHrs)+" h " + Math.floor(remMins) + " m " + Math.floor(remSec) + " s ";
    })
    
}
}
