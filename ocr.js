//유저 답안 json배열로 저장, 답안지 json배열로 저장하고 비교해서 채점

const FormData = require('form-data')
const axios = require('axios')
const fs = require('fs');
const { start } = require('repl');

const APIGW_INVOKE_URL = 'https://iy0skh820i.apigw.ntruss.com/custom/v1/27974/9f9aa83c0f6515affddbea27dab0b367895f919cc02125a1b165f037bcb40231/general';
const SECRET_KEY = 'YXhlbEJna2ZJZUxLblR2TmN5RkVXVUZvUEdISlVQSGs=';
const IMGAGE_SOURCE = '../toeic-helper/images/answer-example.jpg';
const UPPERCASE_LETTERS = /[A-Z]/g;

function generateRequestId() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const requestId = `${timestamp}_${randomString}`;
    return requestId;
}
  
async function requestWithFile () {
    const file = fs.createReadStream(IMGAGE_SOURCE) // image file object. Example: fs.createReadStream('./example.png')
    const message = {
      images: [
        {
          format: 'jpg', // file format
          name: 'answer-example' // file name
        }
      ],
      requestId: generateRequestId(), // unique string
      timestamp: 0,
      version: 'V2'
    }
    const formData = new FormData()
  
    formData.append('file', file)
    formData.append('message', JSON.stringify(message))
  
    return axios
      .post(
        APIGW_INVOKE_URL, // APIGW Invoke URL
        formData,
        {
          headers: {
            'X-OCR-SECRET': SECRET_KEY, // Secret Key
            ...formData.getHeaders()
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          return res.data;
          
        }
      })
      .catch(e => {
        console.warn('requestWithFile error', e.response)
      })
}

async function registerAnswersheet(data){
  let answersheet = [];
  let promise = new Promise((resolve,reject) => {
    resolve(converDataToArray(data))
  });

  answersheet = await promise;
  saveAnswerSheetAsFile(answersheet);
}

/**배열을 파일에 저장 */
function saveAnswerSheetAsFile(answersheet){
  const jsonString = JSON.stringify(answersheet)
  fs.writeFile('answer1.json',jsonString,(err) =>{
    if(err) throw err;
    console.log('저장되었습니다');
  });
}


/**string으로 변환된 답안지에서 알파벳만 추출하여 array로 변환 */
function converDataToArray(data){
  let answerString = convertDataToString(data);
  let answerArray = answerString.match(UPPERCASE_LETTERS);

  return answerArray;
}

/**ocr이 한번 field에서 인덱스와 답을 같이 인식하는 경우가 있어서 문자열로 변환 */
function convertDataToString(data){
  let startIndex = findStartIndex(data);
  let answerString = "";
  
  for(let i = startIndex; i < data.images[0].fields.length ; i++){
    let element = data.images[0].fields[i].inferText;
    answerString += element;
  }
  return answerString;
}

/**1번문제의 인덱스를 찾음 */
function findStartIndex(data){
  for(let i = 0; i < data.images[0].fields.length; i++){
    if(data.images[0].fields[i].inferText === '1'){
      startIndex = i;
      break;
    }
  }
  return startIndex;
}

requestWithFile()
    .then(data => registerAnswersheet(data))
    .catch(error => {
        console.error('Error:', error);
    });