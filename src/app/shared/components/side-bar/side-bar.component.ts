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
      name: 'Quản lý người dùng',
      id: '7',
      icon: 'icon-users',
      link: '/quan-ly-nguoi-dung',
    },
    {
      name: 'Quy trình tuyển dụng',
      id: '1',
      icon: 'icon-users',
      active: true,
      open: true,
      subMenu: [
        {
          name: 'Thông tin tuyển dụng',
          id: '1-1',
          icon: 'icon-add',
          link: '/thong-tin-tuyen-dung',
          active: false,
        },
        {
          name: 'Xác nhận thông tin',
          id: '1-2',
          icon: 'icon-add',
          link: '/xac-nhan-thong-tin',
          active: false,
        },
        {
          name: 'Duyệt thông tin',
          id: '1-3',
          icon: 'icon-add',
          link: '/duyet-thong-tin-hai-mat',
          active: false,
        },
      ],
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
