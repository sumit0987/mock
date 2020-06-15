import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


getData = (url) => {
  return this.http.get(url);
}

postData = (url, petObj) => {
  return this.http.post(url, petObj);
}

updateData = (url,putObj) => {
  return this.http.put(url, putObj);
}

deleteData = (url) => {
  return this.http.delete(url);
}

}
