import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HrRecordsComponent } from './hr-records/hr-records.component';
import { PreviewRecordComponent } from './preview-record/preview-record.component';
import { VerifyRecordComponent } from './verify-record/verify-record.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '',
      //   pathMatch: 'full',
      // },
      {
        path: 'nhan-su',
        loadChildren: () =>
          import('./users-management/users-management-routing.module').then(
            (module) => module.UsersManagementRoutingModule
          ),
      },
      {
        path: 'ho-so-nhan-su',
        component: HrRecordsComponent,
      },
      { path: 'xac-nhan-thong-tin', component: PreviewRecordComponent },
      { path: 'kiem-duyet-thong-tin', component: VerifyRecordComponent },
    ],
  },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
