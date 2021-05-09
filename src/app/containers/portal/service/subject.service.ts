import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISubject } from '../models/subject.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponseData } from 'src/app/shared/model/http-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjects = new BehaviorSubject<ISubject[]>([]);
  private url = environment.baseUrl + 'subjects';

  constructor(private http: HttpClient) {}

  public get subjects$(): Observable<ISubject[]> {
    return this.subjects.asObservable();
  }

  public fetchAllSubjectsWithStudent() {
    const endpoint = `${this.url}/students`;
    return this.http
      .get<HttpResponseData<ISubject[]>>(endpoint)
      .pipe(map((subjects) => subjects.data))
      .toPromise()
      .then((subjects) => this.subjects.next(subjects));
  }
}
