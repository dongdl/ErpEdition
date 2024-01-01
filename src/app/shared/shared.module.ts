import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageBarComponent } from './components/page-bar/page-bar.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [],
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
  ],
})
export class SharedModule {}
