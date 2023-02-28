import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ServerService, Teams, Teamnames } from '../server.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder, public server: ServerService) { }



  teamnames: any | undefined;

  newTeamName = new UntypedFormControl('');  

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
  }

  onSubmit(){
    this.currentTeam = this.teamForm.value;
    this.server.registerTeam(this.currentTeam).subscribe();
    this.clear();
  }

  getTeamByName(name: string){
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
    })
    this.newTeamName.setValue('');
    this.searchTeam();
  }

  searchTeam(){
    this.server.searchTeamByName(this.newTeamName.value).subscribe((response: Teamnames[]) => {
      this.teamnames = response;
    })
  }

  ngOnInit(): void {
  }

}
