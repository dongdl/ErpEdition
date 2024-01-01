import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-add-edit-user-form',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './add-edit-user-form.component.html',
  styleUrl: './add-edit-user-form.component.css',
})
export class AddEditUserFormComponent {}
