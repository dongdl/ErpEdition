import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  recordListGuard,
  userGuard,
  verifyRecordGuard
} from '../shared/services/authentication/authGuard.service'
import { MainComponent } from './main.component'
import { RecordCompleteComponent } from './record-complete/record-complete.component'
import { RecordProcessingComponent } from './record-processing/record-processing.component'
import { RecordWaitHandleComponent } from './record-wait-handle/record-wait-handle.component'
import { UsersManagementComponent } from './users-management/users-management.component'
import { VerifyRecordComponent } from './verify-record/verify-record.component'

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
        path: 'thong-tin-tuyen-dung-can-xu-ly',
        component: RecordWaitHandleComponent,
        canActivate: [recordListGuard]
      },
      {
        path: 'thong-tin-tuyen-dung-dang-xu-ly',
        component: RecordProcessingComponent,
        canActivate: [recordListGuard]
      },
      {
        path: 'thong-tin-tuyen-dung-hoan-thanh',
        component: RecordCompleteComponent,
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
