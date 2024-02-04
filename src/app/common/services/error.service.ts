import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  errorHandler(error:HttpErrorResponse){
    if(error.status ==0){

    }
console.log(error)
  }
}
