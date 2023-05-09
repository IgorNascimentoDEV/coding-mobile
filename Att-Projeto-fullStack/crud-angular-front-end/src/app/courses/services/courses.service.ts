import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Course } from './../model/course';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private API = "http://localhost:8080/api/courses";

  constructor(private httpClient: HttpClient) { }

  public list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      tap(
        courses => console.log(courses)
      ));
  }

  public save(record: Partial<Course>){
    if(record._id){
      return this.update(record);
    }else{
      return this.create(record);
    }
  }

  public loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  public remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
