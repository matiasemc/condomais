import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cm-stepper',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stepper">
      @for (step of steps(); track $index) {
        <div class="stepper__step"
             [class.stepper__step--active]="$index === activeStep()"
             [class.stepper__step--done]="$index < activeStep()">
          <div class="stepper__dot">
            @if ($index < activeStep()) {
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="3" stroke-linecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            } @else {
              {{ $index + 1 }}
            }
          </div>
          <span class="stepper__label">{{ step }}</span>
        </div>
        @if ($index < steps().length - 1) {
          <div class="stepper__line" [class.stepper__line--done]="$index < activeStep()"></div>
        }
      }
    </div>
  `,
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  steps      = input.required<string[]>();
  activeStep = input(0);
}
