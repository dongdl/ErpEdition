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
          name: 'Duyệt thông tin',
          id: '1-2',
          icon: 'icon-add',
          link: '/duyet-thong-tin',
          active: false,
        },
      ],
    },
    {
      name: 'Nộp hồ sơ nhân sự',
      id: '2',
      icon: 'icon-users',
      link: '/ho-so-nhan-su',
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
