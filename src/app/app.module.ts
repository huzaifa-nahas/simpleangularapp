import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ApiInterceptor} from './ApiInterceptor';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'

import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,    
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatDialogModule
  ],
  providers: [DataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
    