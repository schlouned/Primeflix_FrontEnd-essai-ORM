import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenDto} from "../Model/token-dto";

const applicationJson = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  //members
  oAuthURL = 'https://localhost:9090/oAuth/';

  //constructor
  constructor(private httpClient: HttpClient) { }

  //methods
  public facebook(tokenDto: TokenDto): Observable<any> {
    return this.httpClient.post<TokenDto>(this.oAuthURL + 'loginByFacebook', tokenDto, applicationJson);
  }

  public google(tokenDto: TokenDto): Observable<any> {
    return this.httpClient.post<TokenDto>(this.oAuthURL + 'loginByGoogle', tokenDto, applicationJson);
  }

}
