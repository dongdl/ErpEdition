import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css'
})
export class ModalConfirmComponent {
  @Input() modalTitle = ''
  @Input() modalContent = ''
  @Output() changeModal = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter()

  closeModal() {
    this.changeModal.emit(false)
  }

  onConfirm() {
    this.confirm.emit(true)
  }

  onCancel() {
    this.changeModal.emit(false)
  }
}
