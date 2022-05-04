import { Component, OnInit } from '@angular/core';
import { ServerService, Standings } from '../server.service';

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
    })
    
  } 

  ngOnInit(): void {
  }

}
