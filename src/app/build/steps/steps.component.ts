import { Component, Input } from '@angular/core';
import { Step } from '../step.model';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent {
  @Input() steps: Step[];
}
