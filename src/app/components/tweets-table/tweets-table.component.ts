import {
  ChangeDetectorRef, Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild,
} from '@angular/core';
import {TwitterApi, TwitterDataSource} from './twitter-datasource';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MdSort} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'app-tweets-table',
  templateUrl: './tweets-table.component.html',
  styleUrls: ['./tweets-table.component.sass']
})
export class TweetsTableComponent implements OnInit, OnChanges {
  dataSource: TwitterDataSource | null;
  displayedColumns: String[];
  @Input()
  dataChange: BehaviorSubject<TwitterApi>;
  @Input()
  tableOptions: TableOptions;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.displayedColumns = [];
    this.tableOptions = {columnDefs: []} as TableOptions;
  }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataChange'] && changes['dataChange'].currentValue) {
      const dataChange: BehaviorSubject<Array<any>> = changes['dataChange'].currentValue;
      this.dataSource = new TwitterDataSource(new TwitterApi(dataChange), this.sort);
      this.changeDetector.detectChanges();
    }
    if (changes['tableOptions'] && changes['tableOptions'].currentValue) {
      this.tableOptions = changes['tableOptions'].currentValue;
      this.displayedColumns = this.getDisplayedColumns();
      this.changeDetector.detectChanges();
    }
  }

  private getDisplayedColumns(): String[] {
    const displayedColumns: Array<string> = [];
    for (const col of this.tableOptions.columnDefs) {
      displayedColumns.push(col.columnDef);
    }
    return displayedColumns;
  }
}

export interface TableOptions {
  columnDefs: Array<{
    columnDef: string;
    headName: string;
  }>;
}
