import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { getUserInfoToLS } from '../../../utils/auth'
import { IUserLogin } from '../../../utils/mock-data'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  get user() {
    return getUserInfoToLS() as IUserLogin
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
