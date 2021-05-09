import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export class ColumnConfig<T> {
  name: string;
  /**
   * Display name is what is shown as header name.
   * Note: If you want to pass a custom template header this should be a null value.
   */
  displayName?: string | null;
  type: T;
}

@Component({
  selector: 'hindsight-ibm-data-table',
  templateUrl: './ibm-data-table.component.html',
  styleUrls: ['./ibm-data-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IbmDataTableComponent implements OnInit, AfterViewInit {
  // Pass data source
  @Input() dataSource: MatTableDataSource<any> = null;
  // pass table columns with their configs
  @Input() tableColumns: ColumnConfig<any>[] = null;
  // pagination page size options
  @Input() pageSizeOptions = [20, 50, 100];
  // pagination row size
  @Input() pageSize = 20;

  // Table row action column template elements
  @Input() customTemplateRef: TemplateRef<HTMLElement>[];
  // Table row expand  row section template elements
  @Input() expandContentTemplateRef: TemplateRef<HTMLElement>;

  /**
   * Header template input
   */
  @Input() headerTemplateRef: TemplateRef<HTMLElement>[];

  // Show filter form field
  @Input() showFilter = true;

  // On Row click event handler
  @Output() rowClick = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input;

  displayedColumns: string[];
  expandedElement = null;

  ngOnInit(): void {
    if (!this.dataSource) {
      throw Error('Ibm Data Table must be provided with data source.');
    }

    if (!this.tableColumns) {
      throw Error('Ibm Data Table must be provided with column definitions.');
    }
    this.displayedColumns = this.tableColumns.map((column, index) => column.name);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(expandedElement: any): void {
    this.rowClick.next(expandedElement);
  }
}
