const fs = require('fs');


fs.readFile('answer1.json', 'utf-8', (err,data) =>{
    if(err) throw err;

    const receivedAnswersheet = JSON.parse(data);
    console.log(receivedAnswersheet);
    
});

