import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, SharedModule, SideBarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {}
