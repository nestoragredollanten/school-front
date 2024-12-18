import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfessorSub} from "./professor-sub";
import {Professor} from "./professor";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly apiUrl = 'http://localhost:8080/api/professor';
  private readonly http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllProfessor(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}`);
  }

  getProfessor(id: number | undefined): Observable<ProfessorSub> {
    return this.http.get<ProfessorSub>(`${this.apiUrl}/${id}`);
  }
}
