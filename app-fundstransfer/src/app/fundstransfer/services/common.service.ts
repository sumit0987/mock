import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Service provider for my eshopping car applications. It executes the http methods to
 * get, put, post and delete data. It basically performs CRUD operations for us.
 *  
 */
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  /**
   * To get data from the database
   * @param url {string}
   */
  getData = (url) => {
    return this.httpClient.get(url);
  }
  
  /**
   * To post/save data from the database
   * @param url {string}
   * @param postObj {any}
   */
  postData = (url, postObj) => {
    return this.httpClient.post(url, postObj);
  }
  
  /**
   * To put/update data from the database
   * @param url {string}
   * @param putObj {any}
   */
  updateData = (url,putObj) => {
    return this.httpClient.put(url, putObj);
  }
  
  /**
   * To delete data from the database
   * @param url {string}
   */
  deleteData = (url) => {
    return this.httpClient.delete(url);
  }
}
