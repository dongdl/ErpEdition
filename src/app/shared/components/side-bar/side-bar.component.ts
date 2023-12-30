import { Component } from '@angular/core';
import { MenuItem } from '../../model/util.model';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  menuList: MenuItem[] = [
    {
      name: 'users',
      id: '1',
      icon: 'icon-users',
      link: '/main/users',
      active: true,
      open: true,
      subMenu: [
        {
          name: 'Add users',
          id: '1-1',
          icon: 'icon-add',
          link: '/login',
          active: false,
        },
      ],
    },
    {
      name: 'client',
      id: '2',
      icon: 'icon-users',
      link: '/main/users',
    },
  ];

  onClickParentMenu(id: string) {
    const item = this.menuList.find((item) => item.id === id);
    if (item) {
      item.active = !item.active;
      item.open = !item.open || false;
    }
  }
}
