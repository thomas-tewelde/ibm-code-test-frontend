import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/containers/auth/models/auth.model';

@Component({
  selector: 'ibm-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss'],
})
export class ViewStudentsComponent implements OnInit {
  @Input() users: IUser[];

  constructor() {}

  ngOnInit(): void {}
}
