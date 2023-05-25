const MainQEn={
  Init(){//인스턴스화
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
    
    //선다형, ox형 모듈 불러오기
    // let quizData = JSON.parse(quiz.dataset.quiz); 
    console.log(AraQuiz);
    AraQuiz;
    
    //new AraQuiz.ChoiceQuiz({정답,도전기회})    
  }
}


