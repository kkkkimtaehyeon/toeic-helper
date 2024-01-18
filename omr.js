const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const section5 = document.getElementById('section5');

const choice = ['A', 'B', 'C', 'D'];

const circle = document.getElementsByClassName('circle');

let userAnswerSheet = new Map();

const checkTheAnswer = (event, aToDList) =>{

    if(event.target.classList[1] === 'clicked'){
    }
    else{
        for(let i = 0; i < aToDList.childNodes.length; i++){
            
            aToDList.childNodes[i].classList.remove('clicked');
        }
        event.target.classList.add('clicked');

        console.log(aToDList.className);
        console.log(aToDList.className.split(" ")[1]);
        console.log(event.target.textContent);

        let problemNumber = aToDList.className.split(" ")[1];
        let userAnswer = event.target.textContent;

        userAnswerSheet.set(problemNumber, userAnswer);
        
    }
}

const createAtoD = (section, start, end) => {

    for(let j = start; j <= end; j++){
        let index = j; 
        let className = 'problem '+ index.toString();

        let aToDList = document.createElement('li');
        aToDList.className= className;

        for (let i = 0; i < 4; i++) {
            let div = document.createElement('div');
    
            div.className = 'circle';
            div.innerHTML = choice[i];
    
            aToDList.appendChild(div);
            
        }
        aToDList.addEventListener('click',(event)=>{
            checkTheAnswer(event,aToDList);
        });

        section.appendChild(aToDList);
    }
}

const createAtoC = (section, start, end) => {

    for(let j = start; j <= end; j++){
        let index = j; 
        let className = 'problem '+ index.toString();

        let aToCList = document.createElement('li');
        aToCList.className= className;

        for (let i = 0; i < 3; i++) {
            let div = document.createElement('div');
    
            div.className = 'circle';
            div.innerHTML = choice[i];

            aToCList.appendChild(div);
        }
        aToCList.addEventListener('click', (event)=>{
            checkTheAnswer(event,aToCList);
        });

        section.appendChild(aToCList);

    }
}

createAtoD(section1, 1, 6);
createAtoC(section1, 7, 20);

createAtoC(section2, 21, 31);
createAtoD(section2, 32, 40);

createAtoD(section3, 41, 60);
createAtoD(section4, 61, 80);
createAtoD(section5, 81, 100);

