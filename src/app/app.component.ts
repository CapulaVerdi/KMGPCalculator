import { Component } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { Calcucalot2Component } from './components/calcucalot2/calcucalot2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent, Calcucalot2Component],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KMGPCalculator';
}
