const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const section5 = document.getElementById('section5');

const lcBtn = document.getElementById('lcBtn');
const rcBtn = document.getElementById('rcBtn');
const saveBtn = document.getElementById('saveBtn');

const choices = ['A', 'B', 'C', 'D'];

const circle = document.getElementsByClassName('circle');

let userAnswerSheet = new Map();

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

const AtoD = (type, problemIndex) =>{
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

        choiceList.appendChild(AtoD(type, index));

        section.appendChild(choiceList);

    }

};

attachChoiceListOnSection('LC',section1,1,20);
attachChoiceListOnSection('LC',section2,21,40);
attachChoiceListOnSection('LC',section3,41,60);
attachChoiceListOnSection('LC',section4,61,80);
attachChoiceListOnSection('LC',section5,81,100);


/*lcBtn.addEventListener('click', () => {
    createOmrLc();
});

rcBtn.addEventListener('click', () => {
    createOmrRc();
});*/




