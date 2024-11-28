let today = new Date();
const date = today.getDate();
const month = today.getMonth()+1;
const spinner = document.getElementById('fetchSpinner');
const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
document.getElementById('daySpan').innerHTML = date;
document.getElementById('monthSpan').innerHTML = monthList[month-1];



async function fetchHistory(){
    spinner.style.display = 'block';
    try{
        const response = await fetch(`https://byabbe.se/on-this-day/${month}/${date}/events.json`);
        if(!response.ok){
            throw new Error(`Error Occures! Response error code: ${response.status}`);
        } else{
            const data = await response.json();
            const tbody = document.getElementById('tableBody');
            const eventsList = data['events'];
            for (i=0;i<eventsList.length;i++){
                var newRow = document.createElement('tr');
                let eventYear = eventsList[i]['year'];
                let eventDescr = eventsList[i]['description'];
                newRow.innerHTML = `<td>${eventYear}</td><td>${eventDescr}</td>`;
                tbody.append(newRow);
            }

        }
} catch(error){
    console.error(error);
}finally{
    spinner.style.display = 'none';
}
}
fetchHistory();