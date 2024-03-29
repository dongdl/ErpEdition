import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  recordListGuard,
  redirect,
  userGuard,
  verifyRecordGuard
} from '../shared/services/authentication/authGuard.service'
import { MainComponent } from './main.component'
import { RecordProcessingComponent } from './employee-record/record-processing/record-processing.component'
import { RecordWaitHandleComponent } from './employee-record/record-wait-handle/record-wait-handle.component'
import { UsersManagementComponent } from './users-management/users-management.component'
import { VerifyRecordComponent } from './employee-record/verify-record/verify-record.component'
import { RecordCompleteComponent } from './employee-record/record-complete/record-complete.component'
import { getUserInfoToLS } from '../utils/auth'
import { IUserLogin } from '../utils/mock-data'
import { VerifyRecordWaitToHandleComponent } from './employee-record/verify-record-wait-to-handle/verify-record-wait-to-handle.component'
import { VerifyRecordProcessComponent } from './employee-record/verify-record-process/verify-record-process.component'
import { VerifyRecordCompleteComponent } from './employee-record/verify-record-complete/verify-record-complete.component'

const redirectTo = () => {
  const user = getUserInfoToLS() as IUserLogin
  if (user === null) return ''

  if (user.username === 'admin') {
    return 'quan-ly-nguoi-dung'
  } else if (user.username === 'user') {
    return 'thong-tin-tuyen-dung-can-xu-ly'
  } else if (user.username === 'manager1' || user.username === 'manager2') {
    return 'duyet-thong-tin-hai-mat-can-xu-ly'
  }
  return ''
}

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: redirectTo(),
        pathMatch: 'full'
      },
      {
        path: 'quan-ly-nguoi-dung',
        component: UsersManagementComponent
        // canActivate: [userGuard]
      },
      {
        path: 'thong-tin-tuyen-dung-can-xu-ly',
        component: RecordWaitHandleComponent
        // canActivate: [recordListGuard]
      },
      // {
      //   path: 'thong-tin-tuyen-dung-dang-xu-ly',
      //   component: RecordProcessingComponent,
      //   canActivate: [recordListGuard]
      // },
      {
        path: 'thong-tin-tuyen-dung-hoan-thanh',
        component: RecordCompleteComponent
        // canActivate: [recordListGuard]
      },
      {
        path: 'duyet-thong-tin-hai-mat-can-xu-ly',
        component: VerifyRecordWaitToHandleComponent
        // canActivate: [verifyRecordGuard]
      },
      // {
      //   path: 'duyet-thong-tin-hai-mat-dang-xu-ly',
      //   component: VerifyRecordProcessComponent,
      //   canActivate: [verifyRecordGuard]
      // },
      {
        path: 'duyet-thong-tin-hai-mat-hoan-thanh',
        component: VerifyRecordCompleteComponent
        // canActivate: [verifyRecordGuard]
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
