import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthStateService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';
import { AuthState } from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient/*, public oktaAuth: OktaAuthStateService*/) { }

  private async request(method: string, url: string, data?: any){
    //const token = await this.oktaAuth.getAccessToken();

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  // getTeams() { 
  //   return this.request('GET', `${environment.serverUrl}/team`);
  // }

  // createTeam(team: {}) {
  //   return this.request('POST', `${environment.serverUrl}/team`, team);
  // }

  // updateTeam(team: {}) {
  //   return this.request('PUT', `${environment.serverUrl}/team/${team.team_id}`, team);
  // }

  // deleteTeam(team: {}) { 
  //   return this.request('DELETE', `${environment.serverUrl}/team/${team.team_id}` );
  // }

}
