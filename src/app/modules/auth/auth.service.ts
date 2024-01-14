import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, defer, map, of } from 'rxjs'
import { saveUserInfoToLS } from '../../utils/auth'
import { apiLogin } from '../../utils/mock-data'

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  loginUser({ username, password }: { username: string; password: string }) {
    return defer(() => apiLogin({ username, password })).pipe(
      map((user) => {
        if (user) {
          saveUserInfoToLS(user)
        }

        return of(user)
      }),
      catchError((error) => {
        throw new Error('username or password is incorrect')
      })
    )
  }

  startTask(id: number) {
    return this.httpClient.post(
      'http://localhost:8080/engine-rest/process-definition/key/recruitment/start',
      {
        variables: {
          action: {
            value: 'FULL',
            type: 'String'
          },
          twoEyesApprovalAction: {
            value: 'APPROVE',
            type: 'String'
          },
          existingPosition: {
            value: false,
            type: 'Boolean'
          }
        },
        businessKey: id
      },
      httpOptions
    )
  }

  confirmCurrentTask(id: number) {
    return this.httpClient.post(
      'http://localhost:8080/engine-rest/custom-task/complete-current-task',
      {
        businessKey: id,
        processDefinitionKey: 'recruitment'
      },
      httpOptions
    )
  }
}
