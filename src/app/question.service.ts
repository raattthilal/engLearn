import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  getAllQuestions(){
    return this.http.get<any>(`5000/questions/list/`)
  }
  getQuestionById(id:string){
    return this.http.get<any>(`5000/questions/get/${id}`)
  }
  createQuestion(body:any){
    return this.http.post<any>('5000/questions/create/',body);
  }
  updateQuestion(id:string,body:any){
    return this.http.put<any>(`5000/questions/update/${id}`,body);
  }
  deleteQuestion(id:string){
    return this.http.delete<any>(`5000/questions/delete/${id}`)
  }
  submitQuiz(body:any){
    return this.http.post<any>('5000/quizs/create/',body);
  }
  getResult(){
    return this.http.get<any>('5000/quizs/get/');
  }
}
