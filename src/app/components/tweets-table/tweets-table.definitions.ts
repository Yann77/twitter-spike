import {TableOptions} from './tweets-table.component';
export interface TweetsData {
  id_str: string;
  text: string;
  created_at: string;
  tweet_url: string;
  retweeted_by?: string;
  retweeted_user_profile_url?: string;
}

export interface Settings {
  tableOptions: TableOptions;
  selectedTheme: string;
  since?: Date;
  until?: Date;
  pageSize: number;
}

