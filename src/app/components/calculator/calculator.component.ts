import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  screen = new BehaviorSubject('');
  operationsReg = /[+\-*/.]/;
  result = '';

  constructor() {
    this.screen.subscribe(() => {
      this.result = this.screen.value;
    })
  }

  appendSymbol(symbol: string) {
    if (
      this.operationsReg.test(this.screen.value[this.screen.value.length - 1]) 
      && this.operationsReg.test(symbol)
    ) return;
    this.screen.next(this.screen.value + symbol)
  }
  
  calculate() {
    if (this.screen.value) {
      if (this.operationsReg.test(this.screen.value[this.screen.value.length-1])) {
        this.screen.next(this.screen.value.slice(0, -1))
      }
      const func = Function('return ' +  this.screen.value)()
      this.screen.next(func + '') 
    }
  }

  clear() {
    this.screen.next('')
  }
} 