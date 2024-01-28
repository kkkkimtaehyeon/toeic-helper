const registerBtn = document.getElementById("registerBtn");

function handleRegistration() {
    fetch('http://localhost:3000/run-ocr', {
        method: 'POST',
    })
    .then(response => response.json())
    .catch(error =>{
        console.error('OCR요청 실패',error);
    });
}

registerBtn.addEventListener('click',handleRegistration);