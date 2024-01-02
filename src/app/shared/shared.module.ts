import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageBarComponent } from './components/page-bar/page-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabPanelComponent } from './components/tab-panel/tab-panel.component';
import { TabPanelContentDirective } from './components/tab-panel/tab-panel-content.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcessStepComponent } from './components/process-step/process-step.component';

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
  ],
})
export class SharedModule {}
