import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterLink, RouterModule } from '@angular/router'
import { AddEditUserFormComponent } from '../modules/users-management/add-edit-user-form/add-edit-user-form.component'
import { HeaderComponent } from './components/header/header.component'
import { InputComponent } from './components/input/input.component'
import { ModalComponent } from './components/modal/modal.component'
import { PageBarComponent } from './components/page-bar/page-bar.component'
import { ProcessStepComponent } from './components/process-step/process-step.component'
import { SelectComponent } from './components/select/select.component'
import { SideBarComponent } from './components/side-bar/side-bar.component'
import { TabGroupComponent } from './components/tab-group/tab-group.component'
import { TabPanelContentDirective } from './components/tab-panel/tab-panel-content.directive'
import { TabPanelComponent } from './components/tab-panel/tab-panel.component'
import { FilterListPipe } from './filter-list.pipe'

@NgModule({
  declarations: [TabPanelContentDirective],
  imports: [
    CommonModule,
    HeaderComponent,
    PageBarComponent,
    RouterModule,
    NgForOf,
    NgIf,
    NgClass,
    RouterLink,
    SideBarComponent,
    ModalComponent,
    TabGroupComponent,
    TabPanelComponent,
    ReactiveFormsModule,
    ProcessStepComponent,
    AddEditUserFormComponent,
    FilterListPipe,
    FormsModule,
    InputComponent,
    SelectComponent
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    PageBarComponent,
    SideBarComponent,
    NgForOf,
    NgIf,
    NgClass,
    ModalComponent,
    TabGroupComponent,
    TabPanelComponent,
    TabPanelContentDirective,
    ReactiveFormsModule,
    ProcessStepComponent,
    AddEditUserFormComponent,
    FilterListPipe,
    FormsModule,
    InputComponent,
    SelectComponent
  ]
})
export class SharedModule {}
