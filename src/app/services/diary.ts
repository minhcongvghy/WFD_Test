import {Tag} from './tag';

export interface Diary {
  id?: string;
  date?: string;
  title: string;
  description: string;
  file?: string;
  content: string;
  tag?: Tag;
  update?: string;
  typeFile?: string;
}
