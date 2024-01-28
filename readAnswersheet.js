//답안지를 파일에서 읽음
const fs = require('fs');

fs.readFile('answer1.json', 'utf-8', (err,data) =>{
    if(err) throw err;

    const receivedAnswersheet = JSON.parse(data);
    console.log(receivedAnswersheet);
    
});

