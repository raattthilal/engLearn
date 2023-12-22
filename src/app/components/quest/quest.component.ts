import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/question.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  id!:string
  constructor(private route:ActivatedRoute,private router:Router, private questService:QuestionService) { }

  updateData = new FormGroup({
    question: new FormControl(''),
    options_1: new FormControl(''),
    options_2: new FormControl(''),
    options_3: new FormControl(''),
    options_4: new FormControl(''),
    key: new FormControl('')
  })
  public initalValues:any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if(this.id){
      this.questService.getQuestionById(this.id).subscribe(res=>{
        if(res.success){
        console.log(res);
        
          this.updateData.setValue({
            question: res.data.question,
            options_1: res.data.options_1,
            options_2:res.data.options_2,
            options_3:res.data.options_3,
            options_4:res.data.options_4,
            key:res.data.key
          })
          this.initalValues= this.updateData.value;
        }
      })
    }
  }
   
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  delete(){
    if(this.id.length){
      this.questService.deleteQuestion(this.id).subscribe(res=>{
        if(res.success){
          alert(res.message)
          this.router.navigate(['/questions']);
        }else{
          alert(res.message);
        }
      })
    }
  }
  update(){
    if(this.id.length){
      if(this.initalValues != this.updateData.value){
        this.questService.updateQuestion(this.id,this.updateData.value).subscribe(res=>{
          if(res.success){
            alert("Updated")
            this.router.navigate(['/questions']);
          }else{
            alert(res.message);
          }
        })
      }
    }else{
      if(this.updateData.valid){
        this.questService.createQuestion(this.updateData.value).subscribe(res=>{
          if(res.success){
            alert("Question Created");
            this.router.navigate(['/questions']);
          }else{
            alert(res.message);
          }
        })
      }
    }
  }

}
