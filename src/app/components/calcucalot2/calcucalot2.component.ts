import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calcucalot2',
  standalone: true,
  templateUrl: './calcucalot2.component.html',
  styleUrls: ['./calcucalot2.component.scss']
})
export class Calcucalot2Component {
  operation = new BehaviorSubject('');
  firstOperand = new BehaviorSubject('');
  secondOperand = new BehaviorSubject('');
  resultSubject = new BehaviorSubject('');
  operationReg = /[+\-*/]/;
  result = '';

  constructor() {
    this.resultSubject.subscribe(() => {
      this.result = this.getString();
    });
  }
  
  getString():string {
    return this.resultSubject.value;
  }

  setString(number: string) {
    this.resultSubject.next(this.getString() + number);
  }

  getOperand():string {
    return this.operation.value;
  }

  setOperand(operation:string) {
    this.calculate();
    if (!this.operationReg.test(this.getString()[this.getOperand().length - 1])) {
      this.operation.next(operation);
      this.setString(operation)
    }
  }

  calculate() {
    if (this.operationReg.test(this.getString()[this.getString().length -1])) {
      this.resultSubject.next(this.getString().slice(0, -1));
    }
    const arr = this.getString().split(this.operationReg);
    if (arr.length < 2) { 
      return 
    }
    this.firstOperand.next(arr[0]);
    this.secondOperand.next(arr[1]);
    this.resultSubject.next('');
    switch (this.getOperand()) {
      case '+':
        this.setString(parseFloat(this.firstOperand.value) + parseFloat(this.secondOperand.value) + '')
        break;
        case '-':
          this.setString(parseFloat(this.firstOperand.value) - parseFloat(this.secondOperand.value) + '')
          break;
        case '*':
          this.setString(parseFloat(this.firstOperand.value) * parseFloat(this.secondOperand.value) + '')
          break;
        case '/':
          this.setString(parseFloat(this.firstOperand.value) / parseFloat(this.secondOperand.value) + '')
          break;
      default:
        break;
    }
  }

  clear() {
    this.resultSubject.next('');
  }
}
