import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() openModal = false;
  @Input() modalTitle = '';
  @Input() wrapperClass = 'tw-max-w-[80vw] tw-max-h-[90vh]';
  @Output() changeModal = new EventEmitter<boolean>();

  closeModal() {
    this.changeModal.emit(!this.openModal);
  }
}
