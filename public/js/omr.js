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

gradingBtn.addEventListener('click', () =>{
    location.href
})
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
const clearOmr = () =>{
    for (let i = 1; i <= 5; i++) {
        let sectionId = "section" + i;
        let parentElement = document.getElementById(sectionId);
    
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }
}

class RenderOmr{
    createOmrLc (omrType){
        omrTitle.innerHTML = omrType;
        clearOmr();
        for(let i = 1; i <= 5; i++){
            let section = document.getElementById('section' + i);
            let firstNumber = 1+(i-1)*20;
            let lastNumber = i * 20;
            attachChoiceListOnSection(omrType, section, firstNumber, lastNumber);
        }
    }

    createOmrRc(omrType){
        omrTitle.innerHTML = omrType;
        clearOmr();
        attachChoiceListOnSection(omrType,section1,101,120);
        attachChoiceListOnSection(omrType,section2,121,140);
        attachChoiceListOnSection(omrType,section3,141,160);
        attachChoiceListOnSection(omrType,section4,161,180);
        attachChoiceListOnSection(omrType,section5,181,200);
    }
}


const renderOmr = new RenderOmr();

const initOmr = () =>{
    renderOmr.createOmrLc('LC');
}
initOmr();

lcBtn.addEventListener('click', () => {
    renderOmr.createOmrLc('LC');
});

rcBtn.addEventListener('click', () => {
    renderOmr.createOmrRc('RC');
});

saveBtn.addEventListener('click', () =>{
    let jsonMap = JSON.stringify(Array.from(userAnswerSheet.entries()));
    localStorage.setItem('userAnswerSheet', jsonMap);
});

/** 유저의 omr카드를 불러옴 */
const getUserAnswerSheet = () =>{
    let storedData = localStorage.getItem('userAnswerSheet');
    if(storedData){
        let parsedData = JSON.parse(storedData);
        let loadedUserAnswerSheet = new Map(parsedData);

        return loadedUserAnswerSheet;
    }
    else{
        alert('저장된 OMR이 없습니다!');
    }

}





