import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CertificateService } from 'src/app/certificate.service';
import { QuestionService } from 'src/app/question.service';
import { SuccessAlertService } from 'src/app/success-alert.service';
import { timer, Subscription } from 'rxjs';
interface QUESTION {
  id: string
  question: string;
  options_1: string;
  options_2: string;
  options_3: string;
  options_4: string;
}
@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit,OnDestroy {
  constructor(private router: Router, private questService: QuestionService, private successAlertService: SuccessAlertService,private cert: CertificateService) {
  }
  questionTimer!:number;
  timeRemaining!:number;
  timerSubscription!: Subscription;
  userPaymentStatus!:string;
  quizQuestions!: QUESTION[];
  showModal: boolean = false;
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  quizAnswerOutput: any = [];
  eachAnswer = {
    id: '',
    answerKey: ''
  }
  isClickable: boolean = true;
  ngOnInit(): void {
    this.userPaymentStatus = localStorage.getItem('payment') ?? 'PENDING';
    if(this.userPaymentStatus!='PAID'){
      this.router.navigate(['/payment'])
    }
    if(localStorage.getItem('exam') == 'PASS'){
      this.router.navigate(['/home'])
    }
    this.quizAnswerOutput = [];
    this.showModal = false;
    this.isClickable = true;
    this.questService.getAllQuestions().subscribe(res => {
      if (res.success) {
        this.quizQuestions = res.data;
        this.currentQuestionIndex = 0;
        this.timeRemaining = res.timer;
        this.questionTimer = res.timer;
        this.startTimer();
      }
    })
  }
  ngOnDestroy() {
    // Ensure that the subscription is unsubscribed when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  startTimer() {
    // Create an observable timer that emits every second
    const timer$ = timer(0, 1000);
    // Subscribe to the timer observable
    this.timerSubscription = timer$.subscribe(() => {
      // Update the timer display
      this.timeRemaining--;
      // Check if time is up
      if (this.timeRemaining === 0) {
        // Move to the next question or handle as needed
        this.timerSubscription.unsubscribe();
        this.isClickable = false;
        this.selectedAnswer = "----TimeOut----";
        if(this.eachAnswer.id=='' && this.eachAnswer.answerKey==''){
          this.eachAnswer = {
            id: this.quizQuestions[this.currentQuestionIndex].id,
            answerKey: 'options_0'
          }
        }
        // Trigger code for when time is up (e.g., auto-submit the question)
        this.successAlertService.showSuccess(`Time is over for Question ${this.currentQuestionIndex+1}`);
      }
    });
  }
  selectedAns(ans: any, val: any) {
    this.selectedAnswer = val;
    this.eachAnswer = {
      id: this.quizQuestions[this.currentQuestionIndex].id,
      answerKey: ans
    }
  }
  setVal() {

    if (!this.quizAnswerOutput.some((answer:any) => answer.id === this.eachAnswer.id)) {
      this.quizAnswerOutput.push(JSON.parse(JSON.stringify(this.eachAnswer)));
    }
    console.log(this.quizAnswerOutput);
    
    // Reset selected answer for the next question
    this.selectedAnswer = '';
    this.eachAnswer = {
      id: '',
      answerKey: ''
    };
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.timerSubscription.unsubscribe();
      this.currentQuestionIndex++;
      this.isClickable = true;
      this.timeRemaining = this.questionTimer;
      this.startTimer();
      if (this.currentQuestionIndex == this.quizQuestions.length - 1) {
        this.showModal = true;
      }
      if (this.eachAnswer.id != '' && this.eachAnswer.answerKey != '') {
        this.setVal();
      }
    } else {
      //final answer
      if (this.eachAnswer.id != '' && this.eachAnswer.answerKey != '') {
        this.setVal();
        this.questService.submitQuiz({ answers: this.quizAnswerOutput }).subscribe(res => {
          if(res.success){
            this.successAlertService.showSuccess(res.message);
            if(res.data.result=="PASS"){
              localStorage.setItem('exam','PASS')
              this.cert.createCertificate().subscribe(certif =>{
                if(certif.success){
                  this.successAlertService.showSuccess(certif.message);
                }
              })
            }
            this.router.navigate(['/profile']);
          }else{
            this.successAlertService.showSuccess(res.message);
          }
        })
      }
      console.log('End of quiz');
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
