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

    // 모달 요소 생성 함수
    createModal() {
      let modalElement = document.createElement('div');
      modalElement.className = 'modal modal-content';
      modalElement.innerHTML = 
      `<img id="modal-image">
      <audio id="modal-audio" controls style="display: none;"></audio>`;
      
      return modalElement;
    }

    // 모달 이미지를 표시하는 함수
    displayModalContent(modalElement, imgSrc, audioSrc) {
        let modalImg = modalElement.querySelector('#modal-image');
        let modalAudio = modalElement.querySelector('#modal-audio');
    
        modalImg.src = imgSrc;
        modalAudio.src = audioSrc;
        modalAudio.play();
    
        let transformModal = (scale, opacity, duration) => {
            modalImg.style.transition = `opacity ${duration}s ease-in-out, transform ${duration}s ease-in-out`;
            modalImg.style.transform = `translate(0%, 0%) scale(${scale})`;
            modalImg.style.opacity = opacity;
        };
    
        transformModal(0.5, 0, 0.5);
    
        setTimeout(() => transformModal(1, 1, 0.3), 100);
    
        setTimeout(() => {
            transformModal(0.5, 0, 0.3);
            setTimeout(() => modalImg.style.display = 'none', 500);
        }, 1000);
    }
    
    showModalAnimation(imgSrc, audioSrc) {
        let modalElement = this.createModal();
        this.quizElement.appendChild(modalElement);
        this.displayModalContent(modalElement, imgSrc, audioSrc);
    }

    //confirmBtn 버튼 클릭 시
    choiceConfirmQuiz(){
      this.checkedAns = this.wrap.querySelector('.checked')
      console.log(this.checkedAns);

      const modalImgs = [
        {
            imgSrc: './common/img/alert_blank.png',
            audioSrc: './mp3/alert_blank.mp3'
        },
        {
            imgSrc: './common/img/alert_true.png',
            audioSrc: './mp3/alert_true.mp3'
        },
        {
            imgSrc: './common/img/alert_false.png',
            audioSrc: './mp3/alert_false.mp3'
        },
        {
            imgSrc: './common/img/alert_retry.png',
            audioSrc: './mp3/alert_retry.mp3'
        }
      ];
  
      //정답 선택하지 않았을 때
      if(!this.checkedAns){
        // return;
        //모달창 및 오디오 필요
        this.showModalAnimation(modalImgs[0].imgSrc, modalImgs[0].audioSrc);
        console.log('noooo');
      }

      this.choice = this.checkedAns.dataset.choice;
      console.log('선택한 정답 : '+this.choice);

      if(this.choice == this.answer){//정답일때-------------
        this.answerTrue();
        this.showModalAnimation(modalImgs[1].imgSrc, modalImgs[1].audioSrc);

        //정답에 true 추가
        this.wrap.querySelector(`button[data-choice="${this.answer}"]`).classList.add('true');
      }else if(this.choice !== this.answer){//정답 틀렸을 때-------------
        this.checkedAns.classList.remove('checked');

        let modalElement = this.createModal();
        this.quizElement.appendChild(modalElement);
        
        let retryImg = this.userTryNum < this.maxTryNum ? 3 : 2;
        this.showModalAnimation(modalImgs[retryImg].imgSrc, modalImgs[retryImg].audioSrc);

        if(this.userTryNum == this.maxTryNum){
          //사용자 시도횟수 없는 경우
          this.answerFalse();
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

      const modalImgs = [
        {
            imgSrc: './common/img/alert_blank_input.png',
            audioSrc: './mp3/alert_blank.mp3'
        },
        {
            imgSrc: './common/img/alert_true.png',
            audioSrc: './mp3/alert_true.mp3'
        },
        {
            imgSrc: './common/img/alert_false.png',
            audioSrc: './mp3/alert_false.mp3'
        },
        {
            imgSrc: './common/img/alert_retry.png',
            audioSrc: './mp3/alert_retry.mp3'
        }
      ];
     
      if(this.writeAns == ""){//정답 입력하지 않았을 때-------------
        // return;
        //모달창 및 오디오 필요
        
        this.showModalAnimation(modalImgs[0].imgSrc, modalImgs[0].audioSrc);

        console.log('답 안씀');
      }else if(this.writeAns == this.answer){//정답일때-------------
        this.answerTrue();

        this.showModalAnimation(modalImgs[1].imgSrc, modalImgs[1].audioSrc);

        this.input.classList.add('true');
        this.input.setAttribute("disabled", true);
      }else if(this.writeAns !== this.answer){//정답 틀렸을 때-------------
        console.log('답 틀림');
        this.input.value="";

        let modalElement = this.createModal();
        this.quizElement.appendChild(modalElement);

        let retryImg = this.userTryNum < this.maxTryNum ? 3 : 2;
        this.showModalAnimation(modalImgs[retryImg].imgSrc, modalImgs[retryImg].audioSrc);
        
        if(this.userTryNum == this.maxTryNum){
          //사용자 시도횟수 없는 경우
          this.answerFalse();
          //오답시 value 남아있게 추가 
          this.input.value = this.writeAns;
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

    answerTrue(){
      this.quizElement.classList.remove('false');
      this.quizElement.classList.add('true');
      this.quizElement.classList.add('finished');
      this.confirmBtn.style.display = 'none';
    }
    
    answerFalse(){
      this.quizElement.classList.add('false');
      this.quizElement.classList.add('finished');
      this.confirmBtn.style.display = 'none';
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

      if(JSON.parse(this.wrap.dataset.quiz).type=="입력형"){
        this.input.classList.remove('true');
        this.input.classList.remove('false');
        this.input.removeAttribute("disabled");
        this.input.value="";
      }

      this.retryQres = document.querySelectorAll('.res');
      this.retryQres[this.qnum-1].classList.remove('true');
      this.retryQres[this.qnum-1].classList.remove('false');
    }

  }
}





