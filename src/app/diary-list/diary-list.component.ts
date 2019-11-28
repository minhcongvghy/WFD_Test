import { Component, OnInit } from '@angular/core';
import {Diary} from '../services/diary';
import {DiaryService} from '../services/diary.service';
import {SearchDiaryByTitle} from '../services/search-diary-by-title';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit {

  title: '';
  diaryId: string;
  listDiary: Diary[];
  constructor(private diaryService: DiaryService) { }

  ngOnInit() {
    this.getDiaryList();
  }

  getDiaryList() {
    this.diaryService.getListDiary().subscribe(
      result => {
        this.listDiary = result;
        console.log(this.listDiary);
      }, error => {
        alert('error get diary');
      }
    );
  }

  getDiaryId(id: string) {
    this.diaryId = id;
  }

  searchByTitle() {
    const searchForm: SearchDiaryByTitle = {
      title: this.title,
    };
    this.diaryService.searchDiaryByTitle(searchForm).subscribe(
      result => {
        this.listDiary = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

  deleteDiaryById(closeButton: HTMLInputElement) {
    this.diaryService.deleteDiaryById(this.diaryId).subscribe(
      result => {
        closeButton.click();
        this.getDiaryList();
      }, error => {
        console.log(error);
      }
    );
  }

}
