import {DatePipe} from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Settings, TweetsData} from './components/tweets-table/tweets-table.definitions';
import {MdSelectChange, OverlayContainer, PageEvent} from '@angular/material';
import {TableOptions} from './components/tweets-table/tweets-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title: String = 'Twitter API spike';
  appDirectDataChange: BehaviorSubject<TweetsData[]> = new BehaviorSubject<TweetsData[]>([]);
  laughingSquidDataChange: BehaviorSubject<TweetsData[]> = new BehaviorSubject<TweetsData[]>([]);
  techCrunchDataChange: BehaviorSubject<TweetsData[]> = new BehaviorSubject<TweetsData[]>([]);

  themes = [
    {value: 'default-theme', viewValue: 'Default'},
    {value: 'dark-theme', viewValue: 'Dark'},
  ];

  settings: Settings = {
    tableOptions: {
      columnDefs: [
        {
          columnDef: 'text',
          headName: 'Content',
        },
        {
          columnDef: 'created_at',
          headName: 'Created at'
        },
        {
          columnDef: 'retweeted_by',
          headName: 'Retweeted by'
        },
      ],
    },
    selectedTheme: 'default-theme',
    pageSize: 10,
  };

  pageSizeOptions = [5, 10, 25, 100];

  constructor(private overlayContainer: OverlayContainer,
              private httpClient: HttpClient,
              private datePipe: DatePipe) {
                overlayContainer.themeClass = 'selectedTheme';
  }

  ngOnInit() {
    this.fetchAllTweets();
  }

  onSinceUpdated(since: Date) {
    this.settings.since = since;
    this.fetchAllTweets();
  }

  onUntilUpdated(until: Date) {
    this.settings.until = until;
    this.fetchAllTweets();
  }

  onPageSizeChanged(pageSize: MdSelectChange) {
   if (pageSize.value !== this.settings.pageSize) {
     this.settings.pageSize = pageSize.value;
     this.fetchAllTweets();
   }
  }

  onFetchingNewest() {
    this.fetchAllTweets();
  }

  onColumnMoved() {
    const tableOptionsCopy = { ...this.settings.tableOptions };
    this.settings.tableOptions = tableOptionsCopy;
  }

  private fetchAllTweets() {
    this.fetchTweets('appDirect', this.appDirectDataChange);
    this.fetchTweets('laughingSquid', this.laughingSquidDataChange);
    this.fetchTweets('techCrunch', this.techCrunchDataChange);
  }

  private fetchTweets(subject: string, dataChange: BehaviorSubject<TweetsData[]>): any {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', subject);
    queryParams = queryParams.append('count', '' + this.settings.pageSize);
    if (this.settings.since) {
      queryParams = queryParams.append('since', this.datePipe.transform(this.settings.since, 'yyyy-MM-dd'));
    }
    if (this.settings.until) {
      queryParams = queryParams.append('until', this.datePipe.transform(this.settings.until, 'yyyy-MM-dd'));
    }

    const url = `http://localhost:7890/1.1/search/tweets.json`;

    this.httpClient.get(url, {params: queryParams})
      .subscribe(data => {
        const tweetsData = data['statuses'].map((tweetData) => {
          const tweet: TweetsData = {
            id_str: tweetData.id_str,
            text: tweetData.text,
            created_at: this.datePipe.transform(tweetData.created_at, 'yyyy-MM-dd'),
            tweet_url: `https://twitter.com/${subject}/status/${tweetData.id_str}`,
          };

          if (tweetData.retweeted_status) {
            Object.assign(tweet,
              {
                retweeted_by: tweetData.user.screen_name,
                retweeted_user_profile_url: `https://twitter.com/${tweetData.retweeted_status.user.screen_name}`});
          }
          return tweet;
        }) as Array<TweetsData>;
        dataChange.next(tweetsData);
      });
  }
}
