import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CertificateService } from 'src/app/certificate.service';
import { QuestionService } from 'src/app/question.service';
import { SuccessAlertService } from 'src/app/success-alert.service';
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
export class ExaminationComponent implements OnInit {
  constructor(private router: Router, private questService: QuestionService, private successAlertService: SuccessAlertService,private cert: CertificateService) {
  }
  quizQuestions: QUESTION[] = [];
  showModal: boolean = false;
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  quizAnswerOutput: any = [];
  eachAnswer = {
    id: '',
    answerKey: ''
  }
  ngOnInit(): void {
    this.quizAnswerOutput = [];
    this.showModal = false;
    this.questService.getAllQuestions().subscribe(res => {
      if (res.success) {
        this.quizQuestions = res.data;
        this.currentQuestionIndex = 0;
      }
    })
  }

  selectedAns(ans: any, val: any) {
    this.selectedAnswer = val;
    this.eachAnswer = {
      id: this.quizQuestions[this.currentQuestionIndex].id,
      answerKey: ans
    }
  }
  setVal() {

    if (!this.quizAnswerOutput.includes(this.eachAnswer)) {
      this.quizAnswerOutput.push(JSON.parse(JSON.stringify(this.eachAnswer)));
    }
    // Reset selected answer for the next question
    this.selectedAnswer = '';
    this.eachAnswer = {
      id: '',
      answerKey: ''
    };
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.currentQuestionIndex++;
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
