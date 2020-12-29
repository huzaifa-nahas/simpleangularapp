import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "https://simplenodserver1.herokuapp.com/api/request?";

  constructor(private httpClient: HttpClient) { }

  public get(text:any, number:any){  
	// return this.httpClient.get(this.SERVER_URL+"text="+text+"&number="+number);  
	return this. httpClient.get(this.SERVER_URL, {
      params: {
        text: text,
        number: number
      }
  	});
  }  
}