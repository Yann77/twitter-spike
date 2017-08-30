import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule, MdChipsModule, MdDatepickerModule, MdIconModule, MdInputModule, MdListModule, MdNativeDateModule,
  MdSelectModule,
  MdSortModule,
  MdTabsModule, MdTooltipModule,
} from '@angular/material';
import {MdTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';

import {AppComponent} from './app.component';
import {TweetsTableComponent} from './components/tweets-table/';
import {DndModule} from 'ng2-dnd';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';
import {MentionsDialogComponent} from './components/mentions-dialog/mentions-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TweetsTableComponent,
    MentionsDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdTableModule,
    CdkTableModule,
    MdSortModule,
    MdTabsModule,
    FormsModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    HttpClientModule,
    MdIconModule,
    MdTooltipModule,
    MdChipsModule,
    AsyncLocalStorageModule,
    MdListModule,
    MdButtonModule,
    DndModule.forRoot(),
  ],
  entryComponents: [
    MentionsDialogComponent,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
