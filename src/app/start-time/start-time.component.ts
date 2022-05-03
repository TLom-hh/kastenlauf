import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-start-time',
  templateUrl: './start-time.component.html',
  styleUrls: ['./start-time.component.css']
})
export class StartTimeComponent implements OnInit {

  constructor(public server: ServerService) { }

  time: any = '';

  startTime(){
    this.time = new Date().toString();
    this.server.startTime(this.time).subscribe();
  }

  ngOnInit(): void {
  }

}
