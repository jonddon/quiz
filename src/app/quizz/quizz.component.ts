
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  questions: any[];
  answers:any[];
  questionNumber=0;
  scores=0;

  constructor(private http:Http, private router:Router, private quizzService:QuizzService) {
   
   }

  ngOnInit() {
    
    this.quizzService.getQuestions()
    .subscribe((data:any)=>{
      this.questions=data;
      this.startTimer();
    });
    // this.startTimer();
  }


  Answer(choice){

    if ((this.questions[this.questionNumber].ANS)===choice){
        this.scores++
    }
    this.questionNumber++;
    if(this.questionNumber===10){
      console.log("Quiz Ended");
      this.quizzService.postScores(this.scores);
      this.router.navigateByUrl('/leaderboard');
      return this.scores
    }
    
  }
  startTimer(){
    this.quizzService.timer= setInterval(()=>{
      this.quizzService.seconds--;
      if(this.quizzService.seconds===0){
        alert("You ran out of time");
        this.quizzService.postScores(this.scores);
        this.router.navigateByUrl('/leaderboard');
        return this.scores
      }
    },1000);
    
    return this.quizzService.seconds
  }

}
