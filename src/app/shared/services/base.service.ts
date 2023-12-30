import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseService {
    _apiUri = '';

    constructor(public httpClient: HttpClient, @Inject(String) apiUri: string) {
        this._apiUri = apiUri;
    }

    search(params: any): Observable<any> {
        const options = {
            headers: new HttpHeaders(),
        };
        return this.httpClient.post<any>(`${this._apiUri}/list`, params, options);
    }

    create(data: any): Observable<any> {
        // data.manage_inventory_method_id = data.manage_inventory_method_id ? 1 : 0;
        return this.httpClient.post(`${this._apiUri}/create`, data, {
            headers: new HttpHeaders(),
        });
    }

    update(id: any, data: any): Observable<any> {
        // data.manage_inventory_method_id = data.manage_inventory_method_id ? 1 : 0;
        return this.httpClient.post(`${this._apiUri}/update`, data, {
            headers: new HttpHeaders(),
        });
    }

    delete(id: any): Observable<any> {
        return this.httpClient.delete(`${this._apiUri}/${id}`, { headers: new HttpHeaders() });
    }

    getDetail(id: any): Observable<any> {
        return this.httpClient.get(`${this._apiUri}/detail?id=${id}`, { headers: new HttpHeaders() });
    }

    defaultPost(apiUrl: string, data: any): Observable<any> {
        const options = {
            headers: new HttpHeaders(),
        };
        return this.httpClient.post(apiUrl, data, options);
    }
    defaultPut(apiUrl: string, data: any): Observable<any> {
        const options = {
            headers: new HttpHeaders(),
        };
        return this.httpClient.put(apiUrl, data, options);
    }

    defaultDelete(apiUrl: string, data?: any): Observable<any> {
        const options = {
            headers: new HttpHeaders(),
        };
        return this.httpClient.delete(apiUrl, options);
    }


    defaultGet(apiUrl: string): Observable<any> {
        return this.httpClient.get(apiUrl, { headers: new HttpHeaders(), });
    }

}
