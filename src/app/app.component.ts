import { Component, Pipe, PipeTransform } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from "./data.service";

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fbcExample';
  inputNumber:String="" ;    
  dotFound : any = false;
  inputTextField:String="";
  myForm: FormGroup;  
  messages:String[]=[];
  result:Object = {};
  constructor(private matDialog: MatDialog, private apiService: ApiService, private data: DataService) {
  	this.myForm = new FormGroup({
     'inputTextField': new FormControl(),
     'inputNumberField': new FormControl()
   });
  }


    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        if (this.inputTextField.length==0 || this.inputNumber.length==0) {
        	dialogConfig.data = {"dialogTitle": "Validation Error", "dialogMessage": "Please enter values for text and number."};
        	this.matDialog.open(DialogComponent, dialogConfig);
        }
       	else if (this.inputNumber=="404")
       		dialogConfig.data = {"dialogTitle": "Error", "dialogMessage": "HTTP Request for number 404 returned an error."};
       	else
       		dialogConfig.data = {"dialogTitle": "Successful", "dialogMessage": "HTTP Request for number " + this.inputNumber+" was Successful."};
       	this.messages = this.data.messageList;
       	if (this.inputTextField.length>0 && this.inputNumber.length>0) {
        	this.apiService.get(this.inputTextField, this.inputNumber).subscribe((data:any)=>{						
				this.result = data;                                                                                                                                                            ;				
			});		
			this.matDialog.open(DialogComponent, dialogConfig);
        }
    }

    validateNumber(e: any) {    	
	    let input = String.fromCharCode(e.charCode);    
	    const reg =  /^\d$/;
	    //Is it digit?
	    let isDigit = reg.test(input);
	    // Is it first dot
	    let isFirstDot = false;
	    let containsDot = false;	    
	    if (this.inputNumber.indexOf (".") > 0)
	    	containsDot = true;	    
	    if(!containsDot && input == '.')
			isFirstDot = true;		
		// Is it fractions more than two decimals
		let isMoreThanTwoDecimalsFraction = false;
		if (containsDot && (this.inputNumber.length - this.inputNumber.indexOf (".")>2))			
			isMoreThanTwoDecimalsFraction = true;
		let isGreaterThan10000 = false;
		let possibleInput:number = +(this.inputNumber+input);
		if (possibleInput>10000)
			isGreaterThan10000 = true;
		if ((!isDigit && !isFirstDot) || isMoreThanTwoDecimalsFraction || isGreaterThan10000)			
			e.preventDefault();
	}
}
