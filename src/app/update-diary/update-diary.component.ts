import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {DiaryService} from '../services/diary.service';
import {Diary} from '../services/diary';
import {TagService} from '../services/tag.service';
import {Tag} from '../services/tag';

@Component({
  selector: 'app-update-diary',
  templateUrl: './update-diary.component.html',
  styleUrls: ['./update-diary.component.scss']
})
export class UpdateDiaryComponent implements OnInit {
  private idParam: any;
  diary: Diary;
  private tagList: Tag[];
  private info: any;
  private previewId: string;
  tagId = '';
  private fileUpload: File;
  filePath: any;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private diaryService: DiaryService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params.id;
    });
  }

  ngOnInit() {
    this.diaryService.findDiaryById(this.idParam).subscribe(
      result => {
        this.diary = result;
        console.log(this.diary);
      }, error => {
        console.log(error);
      }
    );

    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ( event ) => {
      this.filePath = reader.result;
    };
  }

  updateDiary(closeButton: HTMLInputElement) {

    if (this.diary.title === '' || this.diary.description === '' || this.diary.content === '') {
      return alert('Fill Data Fields !');
    }

    if (this.tagId === '') {
      this.tagId = this.diary.tag.id;
    }

    const diary: Diary = {
      id: this.diary.id,
      title: this.diary.title,
      description: this.diary.description,
      content: this.diary.content,
      tag: {
        id: this.tagId
      }
    };

    this.diaryService.updateDiary(diary).subscribe(
      result => {
        if (this.fileUpload === null || this.fileUpload === undefined ) {
          console.log('create diary ok');
          closeButton.click();
          this.previewId = result.id;
        } else {
          const form = new FormData();
          form.append('file', this.fileUpload);
          this.diaryService.uploadFile(form, result.id).subscribe(
            next => {
              console.log('upload file ok');
              closeButton.click();
              this.previewId = result.id;
            }, error1 => {
              console.log('loi upload file');
            }
          );
        }
      }, error5 => {
        return console.log('fail create diary');
      }
    );
  }

  preview(closeModalRef1: HTMLButtonElement) {
    closeModalRef1.click();
    return this.router.navigateByUrl('/list-diary');
  }
}
