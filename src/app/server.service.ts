import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teams {
  team_id: number,
  class: string,
  teamname: string,
  location: string,
  beer: string,
  first: string, 
  fnumber: string,
  second: string, 
  snumber: string,
  third: string, 
  tnumber: string,
  fourth: string, 
  vnumber: string,
  member: string
}

export interface Teamnames {
  name: string;
}

export interface Tasktime {
  points: number;
}

export interface Standings {
  teamname: string,
  hours: number,
  minutes: number,
  seconds: number,
  class: string
}

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: HttpClient) { }

  getTeamnames(): Observable<Teamnames>{
    return this.http.get<Teamnames>('https://192.168.242.213:8080/api/teamnames');
  }

  getTeams(): Observable<Teams>{
    return this.http.get<Teams>('https://192.168.242.213:8080/api/teams');
  }

  getTeamByID(id: number): Observable<Teams[]>{
    return this.http.get<Teams[]>('https://192.168.242.213:8080/api/teams/id/' + id);
  }

  getTeamByName(name: string): Observable<Teams[]>{
    return this.http.get<Teams[]>('https://192.168.242.213:8080/api/teams/name/' + name);
  }

  searchTeamByName(name: string): Observable<Teamnames[]>{
    return this.http.get<Teamnames[]>('https://192.168.242.213:8080/api/teams/name/search/' + name);
  }

  searchTeamByNameFinish(name: string): Observable<Teamnames[]>{
    return this.http.get<Teamnames[]>('https://192.168.242.213:8080/api/teams/name/finish/search/' + name);
  }

  registerTeam(team: Teams): Observable<Teams>{
    return this.http.put<Teams>('https://192.168.242.213:8080/api/teams/update/', team);
  }

  startTime(time: string){
    return this.http.get('https://192.168.242.213:8080/api/time/start/' + time);
  }

  getTime(): Observable<any> {
    return this.http.get<any>('https://192.168.242.213:8080/api/time');
  }

  setTime(time: string, teamname: string) {
    return this.http.get('https://192.168.242.213:8080/api/teams/settime/' + teamname + '/' + time);
  }

  setPenalty(teamname: string, penalty: number){
    return this.http.get('https://192.168.242.213:8080/api/teams/setpenalty/' + teamname + '/' + penalty);
  }

  setTotal(teamname: string, hours: number, minutes: number, seconds: number) {
    return this.http.get('https://192.168.242.213:8080/api/teams/settotal/' + teamname +'/' + hours + '/' + minutes + '/' + seconds);
  }

  getStandings(): Observable<Standings[]> {
    return this.http.get<Standings[]>('https://192.168.242.213:8080/api/teams/standings');
  }
  
  getTaskTime(name: string): Observable<Tasktime> {
    return this.http.get<Tasktime>('https://192.168.242.213:8080/api/teams/tasktime/' + name);
  }

  getTimeByName(name: string): Observable<Standings>{
    return this.http.get<Standings>('https://192.168.242.213:8080/api/teams/time/' + name);
  }

}
 