import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/question.service';
interface QUESTION {
  id:string
  question: string;
  options_1: string;
  options_2: string;
  options_3: string;
  options_4:string;
}
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  constructor(private router: Router, private questService:QuestionService){
  }
  questions:QUESTION[]=[];
  filteredQuestions:QUESTION[]=[];
  ngOnInit(): void {
   this.questService.getAllQuestions().subscribe(res=>{
    if(res.success){
      this.questions=res.data;
      this.filteredQuestions = [...this.questions];
    }
   })
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  createQuestion(){
    this.router.navigate(['/question/create']);
  }
  edit(id:any){
    this.router.navigate([`/question/edit/${id}`]);
  }
  sortDirection = 'asc'; // Initial sort direction
  sortKey = 'question'; // Initial sort key

  // Function to filter data based on search input
  filterData(evt: any): void {
    let searchText= evt.target.value;
    this.filteredQuestions = this.questions.filter(quest =>
      quest.question.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Function to sort data based on a given key
  sortData(key: keyof typeof QuestionComponent.prototype.questions[0]): void {
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.filteredQuestions.sort((a, b) => {
      const valueA = a[key].toString().toLowerCase();
      const valueB = b[key].toString().toLowerCase();

      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }
}