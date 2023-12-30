import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// import { getAccessToken } from './jwt';

// let router: Router;
const STATUS_SUCCESS = 'success';
const STATUS_CODE_ERROR = 309; // min error code: 400

export interface Upload {
  progress: number;
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}

@Injectable({
  providedIn: 'root',
})
export class httpService {
  // Base url
  baseurl: string = '';

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': `Bearer ${getAccessToken()}`,
      Authorization: 'Bearer',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
    }),
  };

  constructor(private http: HttpClient) {}

  private querySearch(params: { [x: string]: string | number | boolean }) {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  public dataToParams(data: any): HttpParams {
    let params = new HttpParams();
    for (let name in data) {
      if (data[name] instanceof Date) {
        params = params.append(name, data[name].toISOString());
      } else if (data[name] instanceof Array) {
        for (let i = 0; i < data[name].length; i++) {
          params = params.append(name, data[name][i]);
        }
      } else if (data[name] || data[name] === 0) {
        params = params.append(name, data[name]);
      }
    }
    return params;
  }
  // GET
  getFormQuery<T>(endpoint: string, formQuery?: any): Observable<any> {
    let params = this.dataToParams(formQuery);
    return this.http
      .get<any>(this.baseurl + endpoint, {
        ...this.httpOptions,
        params: params,
      })
      .pipe(
        map((res) => {
          if (res.statusCode > STATUS_CODE_ERROR) {
            // if (res.errors && res.status !== STATUS_SUCCESS) {
            this.errorHandle(res.errors);
          }
          return res;
        }),
        catchError((err) => this.errorHandle(err))
      );
  }

  private mapFilePayload(data: { [x: string]: string | Blob }) {
    let formData = new FormData();
    Object.keys(data).map(function (key, index) {
      formData.append(key, data[key]);
    });
    return formData;
  }

  // POST
  post<T>(
    endpoint: string,
    data: { [x: string]: string | number | boolean | Blob }
  ): Observable<any> {
    return this.http
      .post<any>(
        this.baseurl + endpoint,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        map((res) => {
          if (res.statusCode > STATUS_CODE_ERROR) {
            // if (res.errors && res.status !== STATUS_SUCCESS) {
            this.errorHandle(res.errors);
          }
          return res;
        }),
        catchError((err) => this.errorHandle(err))
      );
  }

  // GET
  get<T>(
    endpoint: string,
    params: { [x: string]: string | number | boolean } = {}
  ): Observable<any> {
    if (Object.keys(params).length > 0) {
      endpoint = `${endpoint}?${this.querySearch(params)}`;
    }
    return this.http.get<any>(this.baseurl + endpoint, this.httpOptions).pipe(
      map((res) => {
        if (res.statusCode > STATUS_CODE_ERROR) {
          // if (res.errors && res.status !== STATUS_SUCCESS) {
          this.errorHandle(res.errors);
        }
        return res;
      }),
      catchError((err) => this.errorHandle(err))
    );
  }

  // PUT
  put<T>(
    endpoint: string,
    data: { [x: string]: string | number | boolean }
  ): Observable<any> {
    return this.http
      .put<any>(this.baseurl + endpoint, JSON.stringify(data), this.httpOptions)
      .pipe(
        map((res) => {
          if (res.statusCode > STATUS_CODE_ERROR) {
            // if (res.errors && res.status !== STATUS_SUCCESS) {
            this.errorHandle(res.errors);
          }
          return res;
        }),
        catchError((err) => this.errorHandle(err))
      );
  }

  // // PUT
  // putNew<T>(endpoint: string, data: { [x: string]: string | number | boolean; }): Observable<any> {
  //   return this.http.put<any>(this.baseurl + endpoint, data, this.httpOptions)
  //     .pipe(
  //       map(res => {
  //         if (res.statusCode > STATUS_CODE_ERROR) {
  //           // if (res.errors && res.status !== STATUS_SUCCESS) {
  //           this.errorHandle(res.errors)
  //         }
  //         return res;
  //       }),
  //       catchError((err) => this.errorHandle(err))
  //     )
  // }

  // del method
  delete<T>(endpoint: string, data: any = null): Observable<any> {
    const optionPayload = { ...this.httpOptions, body: data };
    return this.http.delete<any>(this.baseurl + endpoint, optionPayload).pipe(
      map((res) => {
        if (res.statusCode > STATUS_CODE_ERROR) {
          // if (res.errors && res.status !== STATUS_SUCCESS) {
          this.errorHandle(res.errors);
        }
        return res;
      }),
      catchError(catchError((error) => this.errorHandle(error)))
    );
  }

  postUpload<T>(
    endpoint: string,
    fileData: { [x: string]: string | Blob }
  ): Observable<any> {
    let formData = this.mapFilePayload(fileData);

    const optionSetting: any = {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        Authorization: 'Bearer',
        Accept: 'application/json',
        Cache: 'no-cache',
      }),
    };
    return this.http
      .post<any>(this.baseurl + endpoint, formData, optionSetting)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              // return { ...event.body, document: fileData };
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        }),
        catchError((error) => this.errorHandle(error))
      );
  }

  upload<T>(
    endpoint: string,
    fileData: { [x: string]: string | Blob }
  ): Observable<any> {
    // if (endpoint && fileData) {
    // }
    let formData = this.mapFilePayload(fileData);

    const optionSetting: any = {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        // 'Authorization': `Bearer ${getAccessToken()}`,
        Authorization: 'Bearer',
        Accept: 'application/json',
        Cache: 'no-cache',
      }),
    };

    return this.http
      .post<any>(this.baseurl + endpoint, formData, optionSetting)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              // return { ...event.body, document: fileData };
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        }),

        // scan(calculateState, initialState),
        // map((res: any) => {
        //   if (res.status > STATUS_CODE_ERROR) {
        //   // if (res.errors && res.status !== STATUS_SUCCESS) {
        //     this.errorHandle(res.errors);
        //   }
        //   return res.body;
        // }),
        catchError((error) => this.errorHandle(error))
      );
  }
  // get file source baseurlDoc
  getFile<T>(
    endpoint: string,
    params: { [x: string]: string | number | boolean } = {}
  ): Observable<any> {
    if (Object.keys(params).length > 0) {
      endpoint = `${endpoint}?${this.querySearch(params)}`;
    }
    return this.http.get<any>(this.baseurl + endpoint, this.httpOptions).pipe(
      map((res) => {
        if (res.statusCode > STATUS_CODE_ERROR) {
          // if (res.errors && res.status !== STATUS_SUCCESS) {
          this.errorHandle(res.errors);
        }
        return res;
      }),
      catchError((err) => this.errorHandle(err))
    );
  }
  exportFile(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(this.baseurl + endpoint, data, { responseType: 'blob' })
      .pipe(catchError((err) => this.errorHandle(err)));
  }
  deleteFile<T>(endpoint: string, data: any = null): Observable<any> {
    const optionPayload = { ...this.httpOptions, body: data };
    return this.http.delete<any>(this.baseurl + endpoint, optionPayload).pipe(
      map((res) => {
        if (res.statusCode > STATUS_CODE_ERROR) {
          // if (res.errors && res.status !== STATUS_SUCCESS) {
          this.errorHandle(res.errors);
        }
        return res;
      }),
      catchError(catchError((error) => this.errorHandle(error)))
    );
  }

  // Error handling
  private errorHandle(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = error.error.message;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
