//선다형, ox class 정답체크
const AraQuiz={
  
  ChoiceQuiz:class {
    
    //q=warp
    constructor(wrap){
      this.wrap=wrap;
      console.log(this.wrap)
      // console.log(wrap.dataset.quiz)
      console.log(JSON.parse(wrap.dataset.quiz))
      // console.log(JSON.parse(wrap.dataset.quiz).answer)
    }
  
    confirmCheck(){ 

      //선다형 내가 선택한 답 체크 
      let buttons = this.wrap.querySelectorAll(".select");      
      buttons.forEach(button => {
        button.addEventListener('click', function () {
          buttons.forEach(b => {
            if (b !== button) b.classList.remove('checked');
          });
          this.classList.toggle('checked');
        });
      }); 
      

      //내가 선택한 답 = 정답이면 .true, 아니면 .false
      let mTryNum = JSON.parse(this.wrap.dataset.quiz).tryNum;
      console.log('시도횟수 : '+mTryNum);
      let quizDataAns = JSON.parse(this.wrap.dataset.quiz).answer;
      console.log('퀴즈 정답 : '+quizDataAns); 

      let userTryNum = 1;
      let coAns = document.querySelector(`button[data-choice="${quizDataAns}"]`);
      console.log(coAns); 

      let nextBtn = this.wrap.querySelectorAll(".next");
      let retryBtn = this.wrap.querySelector(".retryAll");
      let confirmBtn = this.wrap.querySelector('.confirm'); 
      confirmBtn.addEventListener("click", function(){
        let checkedAns = document.querySelector('.checked')
        console.log(checkedAns);
  
        //정답 선택하지 않았을 때
        if(!checkedAns){
          // return;
          //모달창 및 오디오 필요
          console.log(noooo);
        }
  
        let choice = checkedAns.dataset.choice;
        // console.log(userTryNum);
        console.log('선택한 정답 : '+choice);
  
        let quizElement = confirmBtn.closest('.quiz');
  
        if(choice == quizDataAns){//정답일때-------------
          quizElement.classList.remove('false');
          quizElement.classList.add('true');
          quizElement.classList.add('finished');
          confirmBtn.style.display = 'none';
          //정답에 true 추가
          coAns.classList.add('true');
  
        }else if(choice !== quizDataAns){//정답 틀렸을 때-------------
          checkedAns.classList.remove('checked');
          if(userTryNum == mTryNum){
            //사용자 시도횟수 없는 경우
            quizElement.classList.add('false');
            quizElement.classList.add('finished');
            confirmBtn.style.display = 'none';
            //정답에 true 추가
            coAns.classList.add('true');
          }
          userTryNum++;
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





