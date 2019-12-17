import { Component, OnInit } from '@angular/core';
import {DiaryService} from '../services/diary.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../services/tag';
import {TagService} from '../services/tag.service';
import {Diary} from '../services/diary';
import {ActivatedRoute, Router} from '@angular/router';
import {error} from 'util';

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss']
})
export class CreateDiaryComponent implements OnInit {

  info: any;
  fileUpload: File;
  previewId: string;
  public tagList: Tag[] = [];
  formDiary = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    tagId: new FormControl(''),
    file: new FormControl(''),
  });
  private returnUrl: string;
  private filePath: any;

  constructor(private diaryService: DiaryService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
        console.log(this.tagList);
      }, error0 => {
        alert('error get tag');
      }
    );
    console.log(this.info);
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/diary/listUserDiary';
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ( event ) => {
      this.filePath = reader.result;
    };
  }


  createDiary(closeButton: HTMLInputElement) {
    const {title, description, content, tagId} = this.formDiary.value;

    if (title === '' || description === '' || content === '' || tagId === '' || this.fileUpload == null) {
      return alert('Fill Data Fields !');
    }

    const diary: Diary = {
      title,
      description,
      content,
      tag: {
        id: tagId
      }
    };

    console.log(diary);
    this.diaryService.createDiary(diary).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.diaryService.uploadFile(form, result.id).subscribe(
          next => {
            console.log('upload file ok');
            closeButton.click();
            this.previewId = result.id;
            this.formDiary.reset();
            this.filePath = undefined;
          }, error1 => {
            console.log('loi upload file');
          }
        );
      }, error5 => {
        return console.log('fail create diary');
      }
    );
  }

  preview(closeButton: HTMLInputElement) {
    closeButton.click();
    return this.router.navigateByUrl('/blog');
  }
}
