import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class DataService {


private observableMessages: BehaviorSubject<Array<String>>;  
private messages: String[]= [];
	constructor() {
		this.messages = new Array<String>();  
  		this.observableMessages = <BehaviorSubject<String[]>>new BehaviorSubject<String[]>([]); 
	}

	get messageList() {
  		return this.messages;
	}

    addMessage(message: String) {
	  this.messages.push(message);
	  this.observableMessages.next(this.messages);
	}
}



