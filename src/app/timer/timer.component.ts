import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ServerService } from '../server.service';

export interface Entry {
  created: Date;
  id: string;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(public server: ServerService) { }

  timer: Entry = {
    id: 'first',
    created: new Date(),
  };

  time: TimeSpan = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  currentTime: Date = new Date();

  newID: string | undefined;
  intervalID: any | undefined;

  ngOnInit(): void {
    this.server.getTime().subscribe((response) =>  {
      this.timer.created = new Date(response[0].startTime)
    })
   
    this.intervalID = interval(1000).subscribe(() => {
      this.getElapsedTime(this.timer);
    });
  }

  ngOnDestroy() {
    this.intervalID.unsubscribe();
  }

  getElapsedTime(entry: Entry){
    let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;

  
    this.time.hours = hours;
    this.time.minutes = minutes;
    this.time.seconds = seconds;
    
  }

}
