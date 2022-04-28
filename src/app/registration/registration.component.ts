import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  teamForm = this.fb.group({
    class: ['', Validators.required],
    teamname: ['', [Validators.required, Validators.minLength(4)]],
    location: [''],
    beer: ['', Validators.required],
    first: this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-z ]*')]],
      telephoneNumber: ['', Validators.required],
    }),
    second: this.fb.group({
      name: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
    }),
    third: this.fb.group({
      name: [''],
      telephoneNumber: [''],
    }),
    fourth: this.fb.group({
      name: [''],
      telephoneNumber: [''],
    }),
  });

  onSubmit(){
    //TODO: Use EventEmitter with form value
    console.warn(this.teamForm.value);
  }

  get members(){
    return this.teamForm.get('members') as FormArray;
  }

  addMember(){
    this.members.push(this.fb.control(''));
  }

  get teamname() { return this.teamForm.get('teamName')}

  get f() { return this.teamForm.controls }

  ngOnInit(): void {
  }

}
