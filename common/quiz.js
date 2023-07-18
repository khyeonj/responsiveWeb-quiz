//선다형, ox class 정답체크
const AraQuiz={
  
  ChoiceQuiz:class {
    //한번만 사용할 함수는 class사용 x, const로 선언 후 작성
    //q=warp
    //constructor의 ()안은 속성
    //init처럼 밖에 선언한 것은 메소드

    constructor(wrap, {nextHandler}, qnum, totalQnum){
      this.wrap = wrap;
      this.nextHandler = nextHandler;
      this.qnum = qnum;
      this.totalQnum = totalQnum;

      this.myAnswer = 0;
      this.answer = JSON.parse(this.wrap.dataset.quiz).answer;
      this.buttons = this.wrap.querySelectorAll(".select");

      this.maxTryNum = JSON.parse(this.wrap.dataset.quiz).tryNum;
      this.quizDataAns = JSON.parse(this.wrap.dataset.quiz).answer;
      console.log('퀴즈 정답 : '+this.quizDataAns); 

      this.confirmBtn = this.wrap.querySelector('.confirm'); 
      this.nextBtn = this.wrap.querySelector(".next");

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
      let coAns = this.wrap.querySelector(`button[data-choice="${this.quizDataAns}"]`);
      console.log(coAns); 

      let quizElement = this.confirmBtn.closest('.quiz');

      this.confirmBtn.addEventListener("click", _=>{
        
        let checkedAns = document.querySelector('.checked')
        console.log(checkedAns);
  
        //정답 선택하지 않았을 때
        if(!checkedAns){
          // return;
          //모달창 및 오디오 필요
          console.log('noooo');
        }
  
        let choice = checkedAns.dataset.choice;
        console.log('선택한 정답 : '+choice);
  
        if(choice == quizDataAns){//정답일때-------------
          this.quizElement.classList.remove('false');
          this.quizElement.classList.add('true');
          this.quizElement.classList.add('finished');
          this.confirmBtn.style.display = 'none';
          //정답에 true 추가
          coAns.classList.add('true');
  
        }else if(choice !== quizDataAns){//정답 틀렸을 때-------------
          checkedAns.classList.remove('checked');
          if(this.userTryNum == this.maxTryNum){
            //사용자 시도횟수 없는 경우
            this.quizElement.classList.add('false');
            this.quizElement.classList.add('finished');
            this.confirmBtn.style.display = 'none';
            //정답에 true 추가
            coAns.classList.add('true');
          }
          this.userTryNum++;
        }
      });

      //다음 문제
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
    confirmQuiz(){

    }

    //next 버튼 클릭 시 
    show(){
      this.wrap.style.display="block"
    }

    hide(){
      this.wrap.style.display="none"
    }

  }
}







