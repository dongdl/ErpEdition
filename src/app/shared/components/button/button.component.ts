import { NgClass } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = ''
  @Input() btnClass: string = '!tw-text-base'
  @Output() onClick = new EventEmitter()

  click() {
    this.onClick.emit()
  }
}
