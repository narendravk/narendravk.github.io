function updateSize(){
    document.getElementById('selSize').innerHTML = document.getElementById('qrSize').value ;
}



async function generateQR(){
    var qrData = document.getElementById('qrData').value ;
    if (qrData != ""){
        var qrSize = document.getElementById('qrSize').value ;
        console.log(qrData,qrSize);
    try{
        var response = await fetch(`https://api.apgy.in/qr/?data=${qrData}&size=${qrSize}`);
        if (!response.ok){
            throw new Error('Network response was not ok!');
        }else{
            var qrData = await response.blob();
            var imgURL = URL.createObjectURL(qrData);
            document.getElementById('qrImage').setAttribute('src',imgURL);
            document.getElementById('getQRBtn').click();
            document.getElementById('qrForm').reset();
        }
    } catch(error){
        console.error('Error fetching data:',error);
    } 
}
else{
    alert('Error: QR data input is empty, please try again!');
    console.log(qrData,qrSize);
}
}