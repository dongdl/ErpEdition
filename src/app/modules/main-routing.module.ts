import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConfirmRecordComponent } from './confirm-record/confirm-record.component'
import { MainComponent } from './main.component'
import { RecordListComponent } from './record-list/record-list.component'
import { UsersManagementComponent } from './users-management/users-management.component'
import { VerifyRecordComponent } from './verify-record/verify-record.component'
import {
  recordListGuard,
  userGuard,
  verifyRecordGuard
} from '../shared/services/authentication/authGuard.service'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'thong-tin-tuyen-dung',
        pathMatch: 'full'
      },
      {
        path: 'quan-ly-nguoi-dung',
        component: UsersManagementComponent,
        canActivate: [userGuard]
      },
      {
        path: 'thong-tin-tuyen-dung',
        component: RecordListComponent,
        canActivate: [recordListGuard]
      },
      {
        path: 'duyet-thong-tin-hai-mat',
        component: VerifyRecordComponent,
        canActivate: [verifyRecordGuard]
      }
    ]
  }
  // { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
