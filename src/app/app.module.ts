import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CKEditorModule} from 'ngx-ckeditor';
import { HomeComponent } from './home/home.component';
import { TagComponent } from './tag/tag.component';
import { DiaryComponent } from './diary/diary.component';
import { CreateDiaryComponent } from './create-diary/create-diary.component';
import { DetailDiaryComponent } from './detail-diary/detail-diary.component';
import { UpdateDiaryComponent } from './update-diary/update-diary.component';
import {SafeHtmlPipe} from './detail-diary/safe-html-pipe';
import {DiaryListComponent} from './diary-list/diary-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TagComponent,
    DiaryComponent,
    CreateDiaryComponent,
    DetailDiaryComponent,
    UpdateDiaryComponent,
    SafeHtmlPipe,
    DiaryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
