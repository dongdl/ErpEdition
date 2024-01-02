import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HrRecordsComponent } from './hr-records/hr-records.component';
import { PreviewRecordComponent } from './preview-record/preview-record.component';
import { VerifyRecordComponent } from './verify-record/verify-record.component';
import { hasNoUser } from '../shared/services/authentication/authGuard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'thong-tin-tuyen-dung',
        pathMatch: 'full',
      },
      {
        path: 'thong-tin-tuyen-dung',
        loadChildren: () =>
          import('./users-management/users-management-routing.module').then(
            (module) => module.UsersManagementRoutingModule
          ),
      },
      {
        path: 'ho-so-nhan-su',
        component: HrRecordsComponent,
      },
      {
        path: 'duyet-thong-tin',
        component: VerifyRecordComponent,
      },
      {
        path: 'xac-nhan-thong-tin',
        component: PreviewRecordComponent,
        canActivate: [hasNoUser],
      },
      {
        path: 'kiem-duyet-thong-tin',
        component: VerifyRecordComponent,
        canActivate: [hasNoUser],
      },
    ],
  },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
