import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ServerService, Teamnames, Teams } from '../server.service';
import { UntypedFormBuilder } from '@angular/forms';
import { TimeSpan } from '../timer/timer.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

 
  constructor(private fb: UntypedFormBuilder, public server: ServerService) { }

  time: Date = new Date();

  timespan: TimeSpan = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  penaltyTime: TimeSpan = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  teamnames: any | undefined;

  newTeamName = new UntypedFormControl('');

  bottles = new UntypedFormControl(0);

  bottlecaps = new UntypedFormControl(0);

  currentTeam: Teams = {
    team_id: 0,
    class: '',
    teamname: '',
    location: '',
    beer: '',
    first: '',
    fnumber: '',
    second: '',
    snumber: '',
    third: '',
    tnumber: '',
    fourth: '',
    vnumber: '',
    member: '',
  };

  teamForm = this.fb.group({
    team_id: 0,
    class: [''],
    teamname: [''],
    location: [''],
    beer: [''],
    first: [''],
    fnumber: [''],
    second: [''],
    snumber: [''],
    third: [''],
    tnumber: [''],
    fourth: [''],
    vnumber: [''],
    member: ['']
  });

  searchTeam(){
    this.server.searchTeamByName(this.newTeamName.value).subscribe((response: Teamnames[]) => {
      this.teamnames = response;
    })
  }

  getTimeByName(name: string){
    // this.time = new Date();
    // this.server.getTime().subscribe((response) => {
    //   let startTime = new Date(response[0].startTime);
    //   let totalTime = Math.floor((this.time.getTime() - startTime.getTime()) / 1000);
    //   let hours = 0;
    //   let minutes = 0;
    //   let seconds = 0;
    //   if (totalTime >= 3600) {
    //     hours = Math.floor(totalTime / 3600);
    //     totalTime -= 3600 * hours;
    //   }
  
    //   if (totalTime >= 60) {
    //     minutes = Math.floor(totalTime / 60);
    //     totalTime -= 60 * minutes;
    //   }
  
    //   seconds = totalTime;
  
    
    //   this.timespan.hours = hours;
    //   this.timespan.minutes = minutes;
    //   this.timespan.seconds = seconds;
    // }) ;
    this.server.getTeamByName(name).subscribe((response: Teams[]) => {
      this.teamForm.controls['class'].setValue(response[0].class);
      this.teamForm.controls['teamname'].setValue(response[0].teamname);
      this.teamForm.controls['beer'].setValue(response[0].beer);
      this.teamForm.controls['first'].setValue(response[0].first);
      this.teamForm.controls['fnumber'].setValue(response[0].fnumber);
      this.teamForm.controls['second'].setValue(response[0].second);
      this.teamForm.controls['snumber'].setValue(response[0].snumber);
      this.teamForm.controls['third'].setValue(response[0].third);
      this.teamForm.controls['tnumber'].setValue(response[0].tnumber);
      this.teamForm.controls['fourth'].setValue(response[0].fourth);
      this.teamForm.controls['vnumber'].setValue(response[0].vnumber);
      this.teamForm.controls['team_id'].setValue(response[0].team_id);
      this.teamForm.controls['member'].setValue(response[0].member);
      this.currentTeam = this.teamForm.value;
      this.server.setTime(this.time.toString(), this.currentTeam.teamname).subscribe();
    })
    this.server.getTimeByName(this.currentTeam.teamname).subscribe((response) => {
      this.timespan.hours = response.hours;
      this.timespan.minutes = response.minutes;
      this.timespan.seconds = response.seconds;
    })
    this.newTeamName.setValue('');
    this.searchTeam();
  }

  clear(){
    this.teamForm.controls['class'].setValue('');
    this.teamForm.controls['teamname'].setValue('');
    this.teamForm.controls['beer'].setValue('');
    this.teamForm.controls['first'].setValue('');
    this.teamForm.controls['fnumber'].setValue('');
    this.teamForm.controls['second'].setValue('');
    this.teamForm.controls['snumber'].setValue('');
    this.teamForm.controls['third'].setValue('');
    this.teamForm.controls['tnumber'].setValue('');
    this.teamForm.controls['fourth'].setValue('');
    this.teamForm.controls['vnumber'].setValue('');
    this.teamForm.controls['team_id'].setValue(0);
    this.teamForm.controls['member'].setValue('');
    this.currentTeam = this.teamForm.value;
    this.bottles.setValue(0);
    this.bottlecaps.setValue(0);
    this.timespan.hours = 0;
    this.timespan.minutes = 0;
    this.timespan.seconds = 0;
    this.penaltyTime.minutes = 0;
    this.penaltyTime.hours = 0;
    this.penaltyTime.seconds = 0;
  }

  setTimes() {
    this.refreshPenalty();
    this.server.setTotal(this.currentTeam.teamname, this.penaltyTime.hours, this.penaltyTime.minutes, this.penaltyTime.seconds).subscribe();
    this.clear();
  }

  refreshPenalty() {
    let totalPenalty = this.bottles.value * 900 + this.bottlecaps.value * 600;
    this.server.setPenalty(this.currentTeam.teamname, totalPenalty).subscribe();
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (totalPenalty >= 3600) {
      hours = Math.floor(totalPenalty / 3600);
      totalPenalty -= 3600 * hours;
    }
  
    if (totalPenalty >= 60) {
      minutes = Math.floor(totalPenalty / 60);
      totalPenalty -= 60 * minutes;
    }
  
    seconds = totalPenalty;

    if ((this.timespan.seconds + seconds) > 59) {
      minutes++;
      seconds -= 60;
    }

    if ((this.timespan.minutes + minutes) > 59) {
      hours++;
      minutes -= 60;
    }

    this.penaltyTime.hours = this.timespan.hours + hours;
    this.penaltyTime.minutes = this.timespan.minutes + minutes;
    this.penaltyTime.seconds = this.timespan.seconds + seconds;
  }

  setDNF() {
    this.server.setTotal(this.currentTeam.teamname, 98, 98, 98).subscribe();
    this.clear();
  }

  setDSQ(){
    this.server.setTotal(this.currentTeam.teamname, 99, 99, 99).subscribe();
    this.clear();
  }

  ngOnInit(): void {
  }

}
