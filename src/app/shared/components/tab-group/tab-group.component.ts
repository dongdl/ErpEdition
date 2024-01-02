import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';
import { NgClass, NgFor, NgForOf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [TabPanelComponent, NgFor, NgForOf, NgTemplateOutlet, NgClass],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.css',
})
export class TabGroupComponent implements OnInit, AfterContentInit {
  @Input() tabActiveIndex = 0;
  @Output() tabActiveChange = new EventEmitter<number>();

  @ContentChildren(TabPanelComponent)
  tabPanelList!: QueryList<TabPanelComponent>;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.tabPanelList.changes.subscribe(() => {
      if (this.tabPanelList.length <= this.tabActiveIndex) {
        this.selectItem(0);
      }
    });
  }

  selectItem(idx: number) {
    this.tabActiveIndex = idx;
    this.tabActiveChange.emit(idx);
  }
}
