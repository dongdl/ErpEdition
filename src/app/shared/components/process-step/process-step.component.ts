import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-process-step',
  standalone: true,
  imports: [NgClass],
  templateUrl: './process-step.component.html',
  styleUrl: './process-step.component.css',
})
export class ProcessStepComponent {
  @Input() activeStep: number[] = [];
}
