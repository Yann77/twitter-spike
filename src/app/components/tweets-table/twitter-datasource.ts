import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Rx';
import {MdSort} from '@angular/material';

import {TweetsData} from './tweets-table.definitions';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export class TwitterDataSource extends DataSource<any> {
  constructor(private twitterApi: TwitterApi,
              private sort: MdSort) {
    super();
  }

  connect(): Observable<TweetsData[]> {
    const displayDataChanges = [
      this.twitterApi.dataChange,
      this.sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  getSortedData(): TweetsData[] {
    const data = this.twitterApi.data.slice();
    if (!this.sort.active || this.sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this.sort.active) {
        case 'text': [propertyA, propertyB] = [a.text, b.text]; break;
        case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
        case 'retweeted_by':
          [propertyA, propertyB] = [a.retweeted_by, b.retweeted_by]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB || !valueA ? -1 : 1) *
        (this.sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() {}
}

export class TwitterApi {
  dataChange: BehaviorSubject<TweetsData[]> = new BehaviorSubject<TweetsData[]>([]);
  constructor(dataSource: BehaviorSubject<TweetsData[]>) {
    this.dataChange = dataSource;
  }
  get data(): TweetsData[] { return this.dataChange.value; }
}
