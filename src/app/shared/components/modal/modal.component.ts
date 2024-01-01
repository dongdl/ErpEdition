import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() openModal = false;
  @Input() modalTitle = '';
  @Output() changeModal = new EventEmitter<boolean>();

  closeModal() {
    this.changeModal.emit(!this.openModal);
  }
}
