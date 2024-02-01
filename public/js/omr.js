const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const section5 = document.getElementById('section5');
const omrTitle = document.getElementById('omrTitle');

const lcBtn = document.getElementById('lcBtn');
const rcBtn = document.getElementById('rcBtn');
const saveBtn = document.getElementById('saveBtn');
const gradingBtn = document.getElementById('gradingBtn');

const choices = ['A', 'B', 'C', 'D'];

const circle = document.getElementsByClassName('circle');

let userAnswerSheet = new Map();

function render(omrType) {
    let startIndex = 0;
    let endIndex = 0;
    if(omrType === 'LC'){
        startIndex = 1;
        endIndex = 100;
    }
    else{
        startIndex = 101;
        endIndex = 200;
    }

    let keysArray = Array.from(userAnswerSheet.keys());
    console.log(keysArray.length);

    for(let i = 0; i < keysArray.length; i++){
        let answerIndex = keysArray[i];
        if(parseInt(answerIndex) >= startIndex && parseInt(answerIndex) <= endIndex){
            let target = document.getElementById(answerIndex);

            let userAnswerIndex = userAnswerSheet.get(answerIndex).charCodeAt(0) - 65;

            target.childNodes[userAnswerIndex].classList.add("clicked");
        }
    }

}

/**유저가 클릭한 답을 마킹*/
const markingAnswer = (problemNumber, userAnswer) =>{
    userAnswerSheet.set(problemNumber, userAnswer);
}

/**문제의 인덱스 번호*/
const attachIndexToProblem = (index, list) =>{
    let span = document.createElement('span');
    span.innerHTML = index.toString() + '. ';
    list.appendChild(span);
}

const createChoices = (type, problemIndex) =>{
    let divContainer = document.createElement('div');
    let choicesLength;
    if(type === 'LC' && (problemIndex >= 7 && problemIndex <= 31)){
        choicesLength = 3;
    }
    else{
        choicesLength = 4;
    }

    for(let i = 0; i < choicesLength; i++){
        let div = document.createElement('div');

        div.className = 'circle';
        div.innerHTML = choices[i];
        div.addEventListener('click', (event) =>{
            for(let j = 0; j < divContainer.childNodes.length; j++){//모든 마킹 취소
                divContainer.childNodes[j].classList.remove('clicked');
            }
            event.target.classList.add('clicked');//특정 보기에 마킹

            console.log(divContainer.id);//문제 번호
            console.log(event.target.textContent);//유저 답안

            markingAnswer(divContainer.id, event.target.textContent);
        });

        divContainer.appendChild(div);
        divContainer.id = problemIndex;
    }

    return divContainer;
}

/**섹션에 보기를 붙임*/
const attachChoiceListOnSection = (type, section, start, end) => {
    for(let i = start; i <= end; i++){
        let index = i;
        let className = 'problem ' + index.toString();

        let choiceList = document.createElement('div');
        choiceList.className = className;

        attachIndexToProblem(index, choiceList);

        choiceList.appendChild(createChoices(type, index));

        section.appendChild(choiceList);
    }
};

/**omr 초기화 */
function clearOmr() {
    for (let i = 1; i <= 5; i++) {
        let sectionId = "section" + i;
        let parentElement = document.getElementById(sectionId);
    
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }
}

class Omr{
    create_LC (omrType){
        omrTitle.innerHTML = omrType;
        clearOmr();
        for(let i = 1; i <= 5; i++){
            let section = document.getElementById('section' + i);
            let firstNumber = 1+(i-1)*20;
            let lastNumber = i * 20;
            attachChoiceListOnSection(omrType, section, firstNumber, lastNumber);
        }
        render(omrType);
    }

    create_RC(omrType){
        omrTitle.innerHTML = omrType;
        clearOmr();
        attachChoiceListOnSection(omrType,section1,101,120);
        attachChoiceListOnSection(omrType,section2,121,140);
        attachChoiceListOnSection(omrType,section3,141,160);
        attachChoiceListOnSection(omrType,section4,161,180);
        attachChoiceListOnSection(omrType,section5,181,200);
        render(omrType);
    }
}


const renderOmr = new Omr();

const initOmr = () =>{
    renderOmr.create_LC('LC');
}
initOmr();

lcBtn.addEventListener('click', () => {
    renderOmr.create_LC('LC');
});

rcBtn.addEventListener('click', () => {
    renderOmr.create_RC('RC');
});

saveBtn.addEventListener('click', () =>{
    let jsonMap = JSON.stringify(Array.from(userAnswerSheet.entries()));
    localStorage.setItem('userAnswerSheet', jsonMap);
});

gradingBtn.addEventListener('click', () =>{
    location.href = "../html/grading.html";
})






