const MainQEn={
  nowQnum:1,
  quizs:[],
   //init에서는 초기화만. 나머지는 함수로 따로 init 밖에서 선언 후 init에선 호출만
  Init(){//인스턴스화
    let main = document.querySelector(".main");
    let startBtn = document.querySelector(".start_btn");
    let resultBtn = document.querySelectorAll(".result");
    let retryAllBtn = document.querySelector(".retryAll");
    
    let startPage = document.querySelector("section[data-page='start']");
    let quizPage = document.querySelector("section[data-page='quiz']");
    let resultPage = document.querySelector("section[data-page='result']");

    //start클릭시 quiz페이지 block
    startBtn.addEventListener("click", function () {
      startPage.style.display = "none";
      quizPage.style.display = "block";
    });

     //퀴즈 
    let quizDoms = document.querySelectorAll(".quiz");
    quizDoms[0].style.display="block"
   
    quizDoms.forEach((q,i)=>{
      let cQuiz = new AraQuiz.ConfirmQuiz(q,{
        nextHandler:this.NextQuiz.bind(this),
        qnum:i+1,
        totalQnum:quizDoms.length
      });  
      //quizs에 cQuiz를 집어넣어 배열로 만들어 사용
      this.quizs.push(cQuiz);
    });

    //result 
    resultBtn.forEach(r=>{  
      r.addEventListener("click", function () {
        //result버튼 클릭시 result페이지 
        quizPage.style.display = "none";
        resultPage.style.display = "block";
      });
    })

    //retryAll버튼 클릭 시
    retryAllBtn.addEventListener("click",()=>{
      quizPage.style.display = "block";
      resultPage.style.display = "none";
      //quiz.finished 제거
      main.classList.remove('finished');
      this.nowQnum = 1;
      quizDoms.forEach((a,i)=>{
        console.log(a);
        let rQuiz = new AraQuiz.ResetQuiz(a);
      });
      quizDoms[0].style.display="block"
    });

   
    if(main.classList.contains('finished')){
      console.log('aaaaaaaaaaaaaaa');
    };

    //총 문제 수(문제에 번호를 매겨서 알아서 총 갯수와 비교할 수 있도록)
    // let totalQnum = document.querySelector(".totalQnum");
    // totalQnum.innerHTML = quiz.length;
    // 맞춘 문제 수 (true 갯수 체크해서 띄우기)
  },
  NextQuiz(){
    console.log(this.nowQnum);
    this.quizs[this.nowQnum-1].hide();

    this.nowQnum++;
    console.log("nextQuiz")
    this.quizs[this.nowQnum-1].show();
  },
  resultTableTrueCheck(){    

  }
}


