import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TagComponent} from './tag/tag.component';
import {DiaryComponent} from './diary/diary.component';
import {CreateDiaryComponent} from './create-diary/create-diary.component';
import {DiaryListComponent} from './diary-list/diary-list.component';
import {UpdateDiaryComponent} from './update-diary/update-diary.component';
import {DetailDiaryComponent} from './detail-diary/detail-diary.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tag',
    component: TagComponent
  },
  {
    path: 'diary',
    component: DiaryComponent
  },
  {
    path: 'create-diary',
    component: CreateDiaryComponent
  },
  {
    path: 'list-diary',
    component: DiaryListComponent,
  },
  {
    path: 'update-diary/:id',
    component: UpdateDiaryComponent
  },
  {
    path: 'detail-diary/:id',
    component: DetailDiaryComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
