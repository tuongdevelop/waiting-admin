import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { QuestionSetService } from './question-set-setup.service';
import { NotificationService, HandleErrorService } from '../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-set-setup',
  templateUrl: './question-set-setup.component.html',
  styleUrls: ['./question-set-setup.component.scss']
})

export class QuestionSetSetupComponent implements OnInit {
  public pageTitle = 'Question Set Setup';
  public breadcrumb = 'Home \\ Question Set Setup \\';

  listQuestionSet: any = null;
  paging = {
    page: 0,
    total: 0,
    pageSize: 10,
    maxSize: 0
  };
  currentPage = 0;
  txtSearch = '';
  alive = true;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private handleErrorService: HandleErrorService,
    private questionSetSVC: QuestionSetService
    ) {}

  ngOnInit() {
    this.getListQuestionSet(0);
  }

  getListQuestionSet(page) {
    this.questionSetSVC.getListQuestionSet(page, this.paging.pageSize)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.listQuestionSet = result.data.results;
        this.paging.total = result.data.totalItems;
        this.paging.maxSize = result.data.totalPage;
      }, (error) => {
        this.handleErrorService.handleError(error);
      });
  }

  pageChange(event) {
    this.getListQuestionSet(event - 1);
    this.currentPage = (event - 1);
  }

  searchQuestionSet() {
    this.questionSetSVC.getListQuestionSet(0, this.paging.pageSize, this.txtSearch)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.listQuestionSet = result.data.results;
        this.paging.total = result.data.totalItems;
        this.paging.maxSize = result.data.totalPage;
      }, (error) => {
        this.handleErrorService.handleError(error);
      });
  }

  deleteQuestionSet(id) {
    this.questionSetSVC.deleteQuestionSet(id)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.getListQuestionSet(this.currentPage);
      }, (error) => {
        this.handleErrorService.handleError(error);
      });
  }

  editQuestionSet(id) {
    this.router.navigateByUrl('new-question-set/' + id);
  }

  updateQuestionSetStates(id, status) {
    this.questionSetSVC.updateQuestionSetStates(id, status)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.getListQuestionSet(this.currentPage);
      }, (error) => {
        this.handleErrorService.handleError(error);
      });
  }

}
