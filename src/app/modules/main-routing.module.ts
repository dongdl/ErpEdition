import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmRecordComponent } from './confirm-record/confirm-record.component';
import { MainComponent } from './main.component';
import { RecordListComponent } from './record-list/record-list.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { VerifyRecordComponent } from './verify-record/verify-record.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'quan-ly-nguoi-dung',
        component: UsersManagementComponent,
      },
      {
        path: 'thong-tin-tuyen-dung',
        component: RecordListComponent,
      },
      {
        path: 'xac-nhan-thong-tin',
        component: ConfirmRecordComponent,
      },
      {
        path: 'duyet-thong-tin-hai-mat',
        component: VerifyRecordComponent,
      },
      // {
      //   path: 'xac-nhan-thong-tin',
      //   component: PreviewRecordComponent,
      //   canActivate: [hasNoUser],
      // },
      // {
      //   path: 'kiem-duyet-thong-tin',
      //   component: VerifyRecordComponent,
      //   canActivate: [hasNoUser],
      // },
    ],
  },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
