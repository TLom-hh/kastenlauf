import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
  vnumber: string
}

export interface Teamnames {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: HttpClient) { }

  // getAllCats(): Observable<Teamname[]>{
  //   return this.http.get<Cat[]>('http://localhost:8080/api/cats/')
  // }

  // getCat(name: string): Observable<Cat>{
  //   return this.http.get<Cat>('http://localhost:8080/api/cats/' + name)
  // }

  // insertCat(cat: Cat): Observable<Cat>{
  //   return this.http.post<Cat>('http://localhast:8080/api/cats/', cat)
  // }

  // updateCat(cat: Cat): Observable<void>{
  //   return this.http.put<void>('localhost:8080/api/cats/' + cat.name, cat)
  // }

  // deleteCat(name: string) {
  //   return this.http.delete('localhost:8080/api/cats/' + name)
  // }

  getTeamnames(): Observable<Teamnames>{
    return this.http.get<Teamnames>('http://localhost:8080/api/teamnames');
  }

  getTeams(): Observable<Teams>{
    return this.http.get<Teams>('http://localhost:8080/api/teams');
  }

  getTeamByID(id: number): Observable<Teams[]>{
    return this.http.get<Teams[]>('http://localhost:8080/api/teams/id/' + id);
  }

  getTeamByName(name: string): Observable<Teams[]>{
    return this.http.get<Teams[]>('http://localhost:8080/api/teams/name/' + name);
  }

  searchTeamByName(name: string): Observable<Teamnames[]>{
    return this.http.get<Teamnames[]>('http://localhost:8080/api/teams/name/search/' + name);
  }

  registerTeam(team: Teams): Observable<Teams>{
    return this.http.put<Teams>('http://localhost:8080/api/teams/update/', team);
  }

}
