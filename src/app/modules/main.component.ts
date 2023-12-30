import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
