
//선다형 내가 선택한 답 체크 (전부 밑에 CONST 안에 하나로 만들어야함.)
/* let buttons = document.querySelectorAll('.select');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    buttons.forEach(b => {
      if (b !== button) b.classList.remove('checked');
    });
    this.classList.toggle('checked');
  });
});

*/

//선다형, ox class 정답체크
// let quizData = JSON.parse(quiz.dataset.quiz); 
const AraQuiz={
  
  ChoiceQuiz:class {
    
    constructor(answer,tryNum){
      // this.type=type;
      this.answer=answer;
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
}


/* 
console.log(quizData.type);

//선다형, ox형 tryNum(시도횟수) 설정
if(quizData.type=="선다형"){
  let cQuiz = new ChoiceQuiz("2");
  cQuiz.confirmCheck();
}else if(quizData.type=="ox형"){
  let oxQuiz = new ChoiceQuiz("1");
  oxQuiz.confirmCheck();
}
 */





