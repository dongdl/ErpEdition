import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ModalComponent } from '../../shared/components/modal/modal.component'

@Component({
  selector: 'app-modal-reason',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './modal-reason.component.html',
  styleUrl: './modal-reason.component.css'
})
export class ModalReasonComponent implements OnInit {
  @Input() modalType: 'agree' | 'reject' = 'agree'
  @Output() close = new EventEmitter<boolean>()
  form!: FormControl

  constructor() {}

  ngOnInit(): void {
    this.form =
      this.modalType === 'agree' ? new FormControl('') : new FormControl('', Validators.required)
  }

  closeModal() {
    this.close.emit(false)
  }
  onSubmit() {
    console.log(this.form.value)
  }
}
