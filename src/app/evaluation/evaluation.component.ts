import { Component, OnInit } from '@angular/core';
import { ServerService, Standings, Tasktime } from '../server.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  constructor(public server: ServerService) { }
  
  teamStandings: Standings[] | undefined;

  eval() {
    this.server.getStandings().subscribe((response) =>{
      this.teamStandings = response;
      for (let team of this.teamStandings) {
        this.server.getTaskTime(team.teamname).subscribe((result) => {
          let taskTime = result.points;
          let hours = 0;
          let minutes = 0;
          let seconds = 0;
          if (taskTime > 0){
            if (taskTime >= 3600) {
              hours = Math.floor(taskTime / 3600);
              taskTime -= 3600 * hours;
            }
          
            if (taskTime >= 60) {
              minutes = Math.floor(taskTime / 60);
              taskTime -= 60 * minutes;
            }
          
            seconds = taskTime;
          }
          if (taskTime < 0) {
            if (taskTime <= 3600) {
              hours = Math.floor(taskTime / 3600);
              taskTime += 3600 * hours;
            }
          
            if (taskTime >= 60) {
              minutes = Math.floor(taskTime / 60);
              taskTime += 60 * minutes;
            }
          
            seconds = taskTime;
          }

        team.hours += hours;
        team.minutes += minutes;
        team.seconds+= seconds;
        });
      }
    })
  } 



  ngOnInit(): void {
  }

}
