

const registerBtn = document.getElementById("registerBtn");
const saveBtn = document.getElementById('saveBtn');
const imgInput = document.getElementById('imgInput');//input 파일
const fName = document.getElementById('nameFile');//input 텍스트

imgInput.addEventListener('change', () =>{
    const preview = document.getElementById('preview');
    preview.src = window.URL.createObjectURL(imgInput.files[0]);
});

function handleRegistration() {
    fetch('/run-ocr', {
        method: 'POST',
    })
    .then(response => response.json())
    .catch(error =>{
        console.error('OCR요청 실패',error);
    });
}

function uploadImg(){
    let file = imgInput.files[0];
    file.name = fName.value;

    if(file){
        const formData = new FormData();
        
        formData.append('image', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json({message : '이미지 업로드 성공'}))
        .catch(error =>{
        console.error('업로드 실패',error);
        });
    }
    else{
        console.error('이미지를 선택하세요.');
    }
}


saveBtn.addEventListener('click', uploadImg);
registerBtn.addEventListener('click',handleRegistration);