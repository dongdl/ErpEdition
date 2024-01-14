import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/api/hrm'

  getListDepartment() {
    return this.http.get(`${this.apiUrl}/mdm/department`)
  }
  getEthic() {
    return this.http.get(`${this.apiUrl}/mdm/ethnic`)
  }
}
