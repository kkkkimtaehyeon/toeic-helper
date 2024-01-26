const goToOmr = document.getElementById("goToOmr");
const goToRegister = document.getElementById("goToRegister");

goToOmr.addEventListener("click", () =>{
    location.href= "html/omr.html";
})

goToRegister.addEventListener("click", ()=>{
    location.href="html/register.html";
})

const fs = require('fs');

fs.readFile('answer.json', 'utf-8', (err,data) =>{
    if(err) throw err;

    const receivedAnswersheet = JOSN.parse(data);

    console.log(receivedAnswersheet);
})