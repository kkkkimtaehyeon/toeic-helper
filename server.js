const express = require('express');
const path = require('path'); 
const { requestWithFile, registerAnswersheet,executeOCR } = require('./public/ocr');
const app = express();
const port = 3000;


app.use( express.static('public'));



/* app.get('', function(req, res){
    res.sendFile(path.join(__dirname, '/html/register.html'));
}); */

app.post('/run-ocr',  async (req, res) =>{
    try{
        executeOCR();
        res.json({ result: 'OCR 동작이 성공적으로 완료되었습니다.' });
    } catch (error) {
        console.error('OCR 동작 실패했습니다.',error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

/* app.get('/', function(req, res){
    fs.readFile('html/register.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200, {'Content-Type': 'text.html'});
            writeHead는 http응답 메시지 헤더를 작성한다는 뜻이고, 
            302는 브라우저한테 페이지를 이동시켜라고 명령하는 것입니다.
            Location: '/'는 어디로 이동할지를 적어주는 것이고요.
            종합하면 '/'로 이동해라라는 명령이 됩니다. 
            res.end(data);
        }
    });
}); */

