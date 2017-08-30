import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'mentions-dialog',
  templateUrl: 'mentions-dialog.component.html',
})
export class MentionsDialogComponent {
  public mentions;

  constructor(
    public dialogRef: MdDialogRef<MentionsDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: {mentions: Array<{name: string, profile_url: string}>}) {
      this.mentions = data.mentions;
  }
}
