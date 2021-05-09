import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ColumnConfig } from 'src/app/core/components/ibm-data-table/ibm-data-table.component';
import { ISubject } from '../../models/subject.model';
import { SubjectService } from '../../service/subject.service';
import { map } from 'rxjs/operators';

type subjectHeadersType = 'string' | 'action';

@Component({
  selector: 'ibm-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  public subjects$: Observable<ISubject[]>;
  public dataSource$: Observable<MatTableDataSource<any>>;

  columnsToDisplay: ColumnConfig<subjectHeadersType>[] = [
    {
      name: 'subjectCode',
      displayName: 'subject Code',
      type: 'string',
    },
    {
      name: 'subjectDesc',
      displayName: 'Description',
      type: 'string',
    },
    {
      name: 'campusCode',
      displayName: 'campus Code',
      type: 'string',
    },
    {
      name: 'students',
      displayName: 'Students',
      type: 'action',
    },
  ];

  constructor(private router: Router, private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.subjectService.fetchAllSubjectsWithStudent();
    this.subjects$ = this.subjectService.subjects$;

    this.dataSource$ = this.subjects$.pipe(map((subjects) => new MatTableDataSource(subjects)));
  }

  viewStudentsClicked(subject: ISubject): void {
    this.router.navigate(['portal', 'subject', 'student']);
  }
}
