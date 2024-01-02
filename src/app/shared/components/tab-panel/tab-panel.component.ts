import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabPanelContentDirective } from './tab-panel-content.directive';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [''],
})
export class TabPanelComponent {
  @Input() title: string = '';
  @ViewChild(TemplateRef, { static: true }) implicitBody!: TemplateRef<unknown>;

  @ContentChild(TabPanelContentDirective, { static: true, read: TemplateRef })
  explicitBody!: TemplateRef<unknown>;

  get panelBody(): TemplateRef<unknown> {
    return this.explicitBody || this.implicitBody;
  }
}
