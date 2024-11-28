const spinner = document.getElementById('fetchSpinner');

function updateSize(){
    document.getElementById('selSize').innerHTML = document.getElementById('qrSize').value ;
}



async function generateQR(){
    spinner.style.display = 'block';
    var qrData = document.getElementById('qrData').value ;
    if (qrData != ""){
        var qrSize = document.getElementById('qrSize').value ;
        console.log(qrData,qrSize);
    try{
        var response = await fetch(`https://api.apgy.in/qr/?data=${qrData}&size=${qrSize}`);
        if (!response.ok){
            throw new Error(`Response Error: ${response.status}`);
        }else{
            var qrData = await response.blob();
            var imgURL = URL.createObjectURL(qrData);
            document.getElementById('qrImage').setAttribute('src',imgURL);
            document.getElementById('getQRBtn').click();
            document.getElementById('qrForm').reset();
        }
    } catch(error){
        console.error('Error fetching data:',error);
    } finally{
        spinner.style.display = 'none';
    }
}
else{
    spinner.style.display = 'none';
    alert('Error: QR data input is empty, please try again!');

}
}