import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerService, Teamnames, Teams } from '../server.service';
import { FormBuilder } from '@angular/forms';
import { TimeSpan } from '../timer/timer.component';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  constructor(private fb: FormBuilder, public server: ServerService) { }

  time: Date = new Date();

  timespan: TimeSpan = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  penalty: number = 0;

  teamnames: any | undefined;

  newTeamName = new FormControl('');

  bottles = new FormControl(0);

  bottlecaps = new FormControl(0);

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

  setTimeByName(name: string){
    this.time = new Date();
    this.server.getTime().subscribe((response) => {
      let startTime = new Date(response[0].startTime);
      let totalTime = Math.floor((this.time.getTime() - startTime.getTime()) / 1000);
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      if (totalTime >= 3600) {
        hours = Math.floor(totalTime / 3600);
        totalTime -= 3600 * hours;
      }
  
      if (totalTime >= 60) {
        minutes = Math.floor(totalTime / 60);
        totalTime -= 60 * minutes;
      }
  
      seconds = totalTime;
  
    
      this.timespan.hours = hours;
      this.timespan.minutes = minutes;
      this.timespan.seconds = seconds;
    }) ;
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
  }

  setPenalty() {
    this.server.setPenalty(this.currentTeam.teamname, Number(this.penalty)).subscribe();
  }

  refreshPenalty() {
    this.penalty = this.bottles.value * 15 + Number(this.bottlecaps.value) * 10;
  }

  ngOnInit(): void {
  }

}
