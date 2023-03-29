let main = document.querySelector(".main");

let startBtn = document.querySelector(".start_btn");
let resultBtn = document.querySelector(".result");
let nextBtn = document.querySelectorAll(".next");
let retryBtn = document.querySelector(".retryAll");
let confirmBtn = document.querySelector('.confirm');

let startPage = document.querySelector("section[data-page='start']");
let quizPage = document.querySelector("section[data-page='quiz']");
let resultPage = document.querySelector("section[data-page='result']");

let quiz = document.querySelector(".quiz");
console.log(quiz);

//총 문제 수
// let totalQnum = document.querySelector(".totalQnum");
// totalQnum.innerHTML = quiz.length;
// 맞춘 문제 수 (true 갯수 체크해서 띄우기)


//start클릭시 quiz페이지 block
startBtn.addEventListener("click", function () {
  startPage.style.display = "none";
  quizPage.style.display = "block";
});

//result클릭시 result페이지 
resultBtn.addEventListener("click", function () {
  quizPage.style.display = "none";
  resultPage.style.display = "block";
});

//내가 선택한 답 체크
let buttons = document.querySelectorAll('.select');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    buttons.forEach(b => {
      if (b !== button) b.classList.remove('checked');
    });
    this.classList.toggle('checked');
  });
});


//선다형, ox class 정답체크
let quizData = JSON.parse(quiz.dataset.quiz);

class ChoiceQuiz{
  constructor(tryNum){
    // this.type=type
    this.tryNum=tryNum;
  }

  confirmCheck(){ 
    //내가 선택한 답 = 정답이면 .true, 아니면 .false
    let mTryNum = this.tryNum;
    console.log(mTryNum);
    let usetTryNum = 1;
    let coAns = document.querySelector(`button[data-choice="${quizData.answer}"]`);

    confirmBtn.addEventListener("click", function(){
      let checkedAns = document.querySelector('.checked')
      console.log(checkedAns);

      //정답 선택하지 않았을 때
      if(!checkedAns){
        return;
        //모달창 및 오디오 필요
      }

      let choice = checkedAns.dataset.choice;

      console.log(usetTryNum);
      console.log(choice);

      let quizElement = confirmBtn.closest('.quiz');

      if(choice == quizData.answer){//정답일때-------------
        quizElement.classList.remove('false');
        quizElement.classList.add('true');
        quiz.classList.add('finished');
        confirmBtn.style.display = 'none';
        //정답에 true 추가
        coAns.classList.add('true');

      }else if(choice !== quizData.answer){//정답 틀렸을 때-------------
        checkedAns.classList.remove('checked');
        if(usetTryNum == mTryNum){
          //사용자 시도횟수 없는 경우
          quizElement.classList.add('false');
          quiz.classList.add('finished');
          confirmBtn.style.display = 'none';
          //정답에 true 추가
          coAns.classList.add('true');
        }
        usetTryNum++;
      }
    });
  }
}

console.log(quizData.type);

//선다형, ox형 tryNum(시도횟수) 설정
if(quizData.type=="선다형"){
  let cQuiz = new ChoiceQuiz("2");
  cQuiz.confirmCheck();
}else if(quizData.type=="ox형"){
  let oxQuiz = new ChoiceQuiz("1");
  oxQuiz.confirmCheck();
}






