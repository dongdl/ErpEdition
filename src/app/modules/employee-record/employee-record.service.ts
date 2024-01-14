import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {
  EMPLOYEE_STATUS,
  Employee,
  HistoryEmployeeItem,
  changeStatusEmployeeRecordRequest
} from '../../model/record'
import { getUserInfoToLS } from '../../utils/auth'
import { IUserLogin } from '../../utils/mock-data'
import ROLES from '../../utils/roles'

const headers = new HttpHeaders({
  'Access-Control-Allow-Origin': '*'
})

@Injectable()
export class EmployeeRecordService {
  constructor(private http: HttpClient, private router: Router) {}
  private apiUrl = 'http://localhost:8080/api/hrm'

  createEditEmployee(newEmployee: Employee) {
    return this.http.post(`${this.apiUrl}/employee/create`, newEmployee, { headers })
  }

  getListEmployeeByRoleAndStatus(status?: EMPLOYEE_STATUS) {
    const user = getUserInfoToLS() as IUserLogin
    let assignee = user.role[0]

    const url = status
      ? `${this.apiUrl}/usertask/recruitment/${user.role[0]}/list/${status}`
      : `${this.apiUrl}/usertask/recruitment/${user.role[0]}/list`
    return this.http.get(url)
  }
  changeStatus(data: changeStatusEmployeeRecordRequest) {
    const { role } = getUserInfoToLS() as IUserLogin
    if (role.includes(ROLES.MANAGER_1)) {
      return this.http.post(`${this.apiUrl}/employee/direct-manager/approval`, data)
    }

    if (role.includes(ROLES.MANAGER_2)) {
      return this.http.post(`${this.apiUrl}/employee/senior-direct-manager/approval`, data)
    }

    if (role.includes(ROLES.USER)) {
      return this.http.post(`${this.apiUrl}/employee/labor-staff/approval`, data)
    }

    throw new Error('')
  }

  getHistoryEmployee(id: number) {
    return this.http.get<HistoryEmployeeItem[]>(`${this.apiUrl}/approval-history/find/${id}`)
  }
}
