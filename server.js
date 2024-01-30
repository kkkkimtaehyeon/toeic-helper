const express = require('express');
const multer = require('multer');
const path = require('path');
const { executeOCR } = require('./utils/ocr.js');

const app = express();
const port = 3000;

app.use( express.static('public'));


let info = {
    now: '',
    title: ''
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, 'public/savedPics/'));
    },
    filename: function(req, file, cb) {
        info.now = Date.now();
        cb(null, info.now + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
      info.title = req.body.name;

      res.json({ message: '이미지 업로드 성공', imageUrl: `/images/${req.file.filename}` });
      console.log('업로드 성공');
    } else {
      res.status(400).json({ error: '이미지 업로드 실패' });
    }
});

app.post('/run-ocr',  (req, res) =>{
    try{
        executeOCR('./public/savedPics/' + info.now + '.jpg', info.title);
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
