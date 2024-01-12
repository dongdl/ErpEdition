import { Component, OnInit } from '@angular/core'
import { MenuItem } from '../../model/util.model'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { sidebarForEachRole } from '../../services/authentication/authGuard.service'
import { MENU_FULL } from '../../../utils/menu'

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  menuList!: MenuItem[]
  ngOnInit(): void {
    this.menuList = sidebarForEachRole([...MENU_FULL])
  }

  onClickParentMenu(id: string) {
    const item = this.menuList.find((item) => item.id === id)
    if (item?.subMenu && item?.subMenu?.length > 0) {
      item.open = !item.open || false
    }
  }
}
