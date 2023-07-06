const MainQEn={
  Init(){//인스턴스화
    let main = document.querySelector(".main");
    let startBtn = document.querySelector(".start_btn");
    let resultBtn = document.querySelector(".result");
    
    let startPage = document.querySelector("section[data-page='start']");
    let quizPage = document.querySelector("section[data-page='quiz']");
    let resultPage = document.querySelector("section[data-page='result']");

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


    let quizDoms = document.querySelectorAll(".quiz");
    // console.log(quizDoms.length)
        
    quizDoms.forEach((q,i)=>{
      if(JSON.parse(q.dataset.quiz).type=="선다형" || JSON.parse(q.dataset.quiz).type=="ox형"){
        let cQuiz = new AraQuiz.ChoiceQuiz(q);  
        console.log(cQuiz)
        cQuiz.confirmCheck();
      };
    })


    //각 퀴즈 모듈에서 컨트롤해야함
    // let nextBtn = document.querySelectorAll(".next");
    // let retryBtn = document.querySelector(".retryAll");
    // let confirmBtn = document.querySelector('.confirm');  

        

    
    //총 문제 수(문제에 번호를 매겨서 알아서 총 갯수와 비교할 수 있도록)
    // let totalQnum = document.querySelector(".totalQnum");
    // totalQnum.innerHTML = quiz.length;
    // 맞춘 문제 수 (true 갯수 체크해서 띄우기)
    
    

    //선다형, ox형 모듈 불러오기

    // let quizData = JSON.parse(quiz.dataset.quiz);      
    // console.log(AraQuiz);
    // console.log(quizData);
    // console.log(quizData.answer);
    
    // AraQuiz;


  }
}


