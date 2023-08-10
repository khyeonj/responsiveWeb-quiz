//정답체크
const AraQuiz={
  ConfirmQuiz:class {
    //한번만 사용할 ㄸㅐ는 class사용 x, const로 선언 후 작성
    constructor(wrap, {nextHandler, qnum, totalQnum}){
      this.wrap = wrap;
      this.nextHandler = nextHandler;
      this.qnum = qnum;
      this.totalQnum = totalQnum;

      this.myAnswer = 0;
      this.buttons = this.wrap.querySelectorAll(".select");
      
      this.maxTryNum = JSON.parse(this.wrap.dataset.quiz).tryNum;
      this.answer = JSON.parse(this.wrap.dataset.quiz).answer;
      console.log('퀴즈 정답 : '+this.answer); 

      this.confirmBtn = this.wrap.querySelector('.confirm'); 
      this.nextBtn = this.wrap.querySelector(".next");
      this.quizElement = this.confirmBtn.closest('.quiz');     

      this.init();
    }

    init(){       
      //선다형 내가 선택한 답 체크 메소드 불러오기
      this.buttons.forEach(b=>{
        b.addEventListener('click',_=>{
           this.setBtn(b);
        })
      })

      //내가 선택한 답 = 정답이면 .true, 아니면 .false
      this.userTryNum = 1;
      
      this.confirmBtn.addEventListener("click", _=>{
        if(JSON.parse(this.wrap.dataset.quiz).type=="선다형" || JSON.parse(this.wrap.dataset.quiz).type=="ox형"){
          this.choiceConfirmQuiz();
        }else if(JSON.parse(this.wrap.dataset.quiz).type=="입력형"){
          this.inputConfirmQuiz();
        }
      });

      //다음 문제 버튼
      this.nextBtn.addEventListener("click",()=>{
        //nextBtn 클릭 시 핸들러 발생 전 할 행동이 있을 경우 함수로 호출 후 행동코드 입력
        this.nextHandler();
      });
      
    }

    //선다형 내가 선택한 답 체크 메소드
    setBtn(button){
      this.buttons.forEach(b=>{
        //b===button이면 add해라. checked를 / 아니면 remove 해라
        b.classList[b===button?"add":"remove"]("checked")
      })
    }

    //confirmBtn 버튼 클릭 시
    choiceConfirmQuiz(){
      this.checkedAns = this.wrap.querySelector('.checked')
        console.log(this.checkedAns);
  
        //정답 선택하지 않았을 때
        if(!this.checkedAns){
          // return;
          //모달창 및 오디오 필요
          console.log('noooo');
        }
  
        this.choice = this.checkedAns.dataset.choice;
        console.log('선택한 정답 : '+this.choice);
  
        if(this.choice == this.answer){//정답일때-------------
          this.quizElement.classList.remove('false');
          this.quizElement.classList.add('true');
          this.quizElement.classList.add('finished');
          this.confirmBtn.style.display = 'none';
          //정답에 true 추가
          this.wrap.querySelector(`button[data-choice="${this.answer}"]`).classList.add('true');
        }else if(this.choice !== this.answer){//정답 틀렸을 때-------------
          this.checkedAns.classList.remove('checked');
          if(this.userTryNum == this.maxTryNum){
            //사용자 시도횟수 없는 경우
            this.quizElement.classList.add('false');
            this.quizElement.classList.add('finished');
            this.confirmBtn.style.display = 'none';
            this.checkedAns.classList.add('checked');
            //정답에 true 추가
            this.wrap.querySelector(`button[data-choice="${this.answer}"]`).classList.add('true');
          }
          this.userTryNum++;
          if(this.userTryNum > this.maxTryNum){
            this.userTryNum = 1;
          }
        }

        //결과보기 버튼
        if(this.qnum == this.totalQnum){ 
          document.querySelector(".main").classList.add('finished');
        }
    }

    inputConfirmQuiz(){
      this.input = this.wrap.querySelector(`input`);
      this.writeAns = this.input.value;
      console.log('작성한 정답 : '+this.writeAns);
     
      if(this.writeAns == ""){//정답 입력하지 않았을 때-------------
        // return;
        //모달창 및 오디오 필요
        console.log('답 안씀');
      }else if(this.writeAns == this.answer){//정답일때-------------
        this.quizElement.classList.remove('false');
        this.quizElement.classList.add('true');
        this.quizElement.classList.add('finished');
        this.confirmBtn.style.display = 'none';
        this.input.classList.add('true');
        this.input.setAttribute("disabled", true);
      }else if(this.writeAns !== this.answer){//정답 틀렸을 때-------------
        console.log('답 틀림');
        this.input.value="";
        if(this.userTryNum == this.maxTryNum){
          //사용자 시도횟수 없는 경우
          this.quizElement.classList.add('false');
          this.quizElement.classList.add('finished');
          this.confirmBtn.style.display = 'none';
          //오답시 value 남아있게 추가
          this.input.classList.add('false');
          this.input.setAttribute("disabled", true);
        }
        this.userTryNum++;
        if(this.userTryNum > this.maxTryNum){
          this.userTryNum = 1;
        }
      }

      //결과보기 버튼
      if(this.qnum == this.totalQnum){ 
        document.querySelector(".main").classList.add('finished');
      }

    }

    //next 버튼 클릭 시 
    show(){
      this.wrap.style.display="block"
    }

    hide(){
      this.wrap.style.display="none"
    }

    reset(){
      this.buttons.forEach(b=>{
        b.classList.remove('checked');
        b.classList.remove('true');
      })
      
      this.confirmBtn.style.display = 'block';

      this.wrap.classList.remove('true');
      this.wrap.classList.remove('false');
      this.wrap.classList.remove('finished');

      this.retryQres = document.querySelectorAll('.res');
      this.retryQres[this.qnum-1].classList.remove('true');
      this.retryQres[this.qnum-1].classList.remove('false');
    }

    //input 정답 시 다시풀기 했을 때 value 값 리셋

  }
}





