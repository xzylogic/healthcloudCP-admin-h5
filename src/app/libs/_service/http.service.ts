import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
  protected headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {
  }

  /**
   * Translate Response Data to JSON
   * @param {Response} response
   */
  private static getJson(response: Response) {
    return response.json();
  }

  /**
   * Translate Request Body Data from Object to JSON
   * @param {any} data
   */
  private static getBody(data: any) {
    return (typeof data === 'object') ? JSON.stringify(data) : data;
  }

  /**
   * Catch Response Error
   * @param {Response} response
   */
  private static checkForError(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error['response'] = response;
      throw error;
    }
  }

  setTimestamps(path): string {
    if (path.indexOf('?') > -1) {
      path += `&timestamp=${new Date().valueOf()}`;
    } else {
      path += `?timestamp=${new Date().valueOf()}`;
    }
    return encodeURI(path);
  }

  /**
   * Set Custom Headers
   * @param headers
   */
  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

  /**
   * HTTP GET METHOD
   * @param  {string}     path
   * @return {Observable}
   */
  get(path: string): Observable<any> {
    return this.http.get(this.setTimestamps(path), {headers: this.headers, withCredentials: true})
      .map(HttpService.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpService.getJson);
  }

  /**
   * HTTP POST METHOD
   * @param  {string}     path
   * @param  {any}        body
   * @return {Observable}
   */
  post(path: string, body: any): Observable<any> {
    return this.http.post(this.setTimestamps(path), HttpService.getBody(body), {headers: this.headers, withCredentials: true})
      .map(HttpService.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpService.getJson);
  }

  /**
   * HTTP PUT METHOD
   * @param  {string}     path
   * @param  {any}        body
   * @return {Observable}
   */
  put(path: string, body: any): Observable<any> {
    return this.http.put(this.setTimestamps(path), HttpService.getBody(body), {headers: this.headers, withCredentials: true})
      .map(HttpService.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpService.getJson);
  }

  /**
   * HTTP DELETE METHOD
   * @param  {string}     path
   * @return {Observable}
   */
  delete(path: string): Observable<any> {
    return this.http.delete(this.setTimestamps(path), {headers: this.headers, withCredentials: true})
      .map(HttpService.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpService.getJson);
  }

  /**
   * 上传图片
   */
  upload(path: string, data: any): Observable<any> {
    return this.http.post(this.setTimestamps(path), data, {headers: new Headers({processData: false}), withCredentials: true})
      .map(HttpService.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpService.getJson);
  }
}
