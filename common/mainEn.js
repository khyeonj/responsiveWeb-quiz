const MainQEn={
  nowQnum:1,
  quizs:[],
   //init에서는 초기화만. 나머지는 함수로 따로 init 밖에서 선언 후 init에선 호출만
  Init(){//인스턴스화
    let main = document.querySelector(".main");
    let startBtn = document.querySelector(".start_btn");
    let resultBtn = document.querySelector(".result");
    let retryBtn = document.querySelector(".retryAll");
    
    let startPage = document.querySelector("section[data-page='start']");
    let quizPage = document.querySelector("section[data-page='quiz']");
    let resultPage = document.querySelector("section[data-page='result']");

    //start클릭시 quiz페이지 block
    startBtn.addEventListener("click", function () {
      startPage.style.display = "none";
      quizPage.style.display = "block";
    });
    
    //result버튼 클릭시 result페이지 
    resultBtn.addEventListener("click", function () {
      quizPage.style.display = "none";
      resultPage.style.display = "block";
    });
    
    let quizDoms = document.querySelectorAll(".quiz");
    console.log(quizDoms)
    
    quizDoms.forEach((q,i)=>{
      if(JSON.parse(q.dataset.quiz).type=="선다형" || JSON.parse(q.dataset.quiz).type=="ox형"){
        let cQuiz = new AraQuiz.ChoiceQuiz(q,{
          nextHandler:this.NextQuiz.bind(this),
          qnum:i+1,
          totalQnum:quizDoms.length
        });  
        //quizs에 cQuiz를 집어넣어 배열로 만들어 사용
        this.quizs.push(cQuiz);
      };

    });


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


  }
}


