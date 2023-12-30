import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageBarComponent } from './components/page-bar/page-bar.component';

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
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    PageBarComponent,
    SideBarComponent,
    NgForOf,
    NgIf,
    NgClass,
  ],
})
export class SharedModule {}
