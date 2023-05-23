import { Component, OnInit } from '@angular/core';
import { QuestionSetupService } from './question-setup.service';
import { takeWhile } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { messageContstants } from '../core/contstants/message.constants';
import { NotificationService, HandleErrorService } from '../core/services';
import { Router } from '@angular/router';

declare var splotsFactory: any;

@Component({
  selector: 'app-question-setup',
  templateUrl: './question-setup.component.html',
  styleUrls: ['./question-setup.component.scss']
})
export class QuestionSetupComponent implements OnInit {
  public pageTitle = 'Questions Setup';
  public breadcrumb = 'Home \\ All Events \\ Question Setup';
  paging = {
    page: 0,
    total: 0,
    pageSize: 5,
    maxSize: 0
  };
  currentPage = 0;
  public disableDelete = true;
  public disableEdit = true;
  public enableBtnEnable = true;
  public disableBtnEnable = true;
  itemsChecked: any = [];
  public questionList: any = [];
  alive = true;

  listSwipeToDraw: any[] = [];

  questionSetId = '';

  constructor(
    private notificationService: NotificationService,
    private handleErrorService: HandleErrorService,
    private questionSetupService: QuestionSetupService,
    private router: Router,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.getListEvents(0);
  }

  formatQuestionList(item, index) {
    item.questionPic = item.questionPic ? item.questionPic : '';
    item.answerPicFirst = item.answerPicFirst ? item.answerPicFirst : '';
    item.answerPicSecond = item.answerPicSecond ? item.answerPicSecond : '';
    item.answerPicThird = item.answerPicThird ? item.answerPicThird : '';
    item.answerPicFourth = item.answerPicFourth ? item.answerPicFourth : '';
    return item;
  }

  pageChange(event) {
    this.getListEvents(event - 1);
    this.currentPage = (event - 1);
  }

  checkbox(question) {
    if (this.itemsChecked.find(x => x === question)) {
      this.itemsChecked.splice(this.itemsChecked.indexOf(question), 1);
    } else {
      this.itemsChecked.push(question);
    }
    this.updateButtonStatus();

  }
  updateButtonStatus() {
    if (this.itemsChecked.length) {
      this.disableDelete = false;
      this.enableBtnEnable = false;
      this.disableBtnEnable = false;
      this.disableEdit = false;
      if (this.itemsChecked.length > 1) {
        this.disableEdit = true;
      }
    } else {
      this.disableEdit = true;
      this.enableBtnEnable = true;
      this.disableBtnEnable = true;
      this.disableDelete = true;
    }
  }
  deleteQuestions() {
    let deleteMessage = '';
    if (this.itemsChecked.length > 1) {
      deleteMessage = messageContstants.CONFIRM_DELETE_MANY_MSG;
    } else {
      deleteMessage = messageContstants.CONFIRM_DELETE_MSG;
    }
    const ids = this.itemsChecked.map(item => item.id);
    this.notificationService.printConfirmationDialog(deleteMessage, () => {
      this.questionSetupService.deleteQuestion(ids)
        .pipe(takeWhile(() => this.alive))
        .subscribe(result => {
          this.itemsChecked.length = 0;
          this.updateButtonStatus();
          this.getListEvents(this.currentPage);
        }, (error) => {
          this.handleErrorService.handleError(error);

        });
    });

  }

  // enableQuestionStatus() {
  enableStates() {
    const ids = this.itemsChecked.map(item => item.id);
    this.questionSetupService.updateQuestionsStatus(ids, 'ENABLE')
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.itemsChecked.length = 0;
        this.updateButtonStatus();
        this.getListEvents(this.currentPage);
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  // disableQuestionStatus() {
  disableStates() {
    const ids = this.itemsChecked.map(item => item.id);
    this.questionSetupService.updateQuestionsStatus(ids, 'DISABLE')
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.itemsChecked.length = 0;
        this.updateButtonStatus();
        this.getListEvents(this.currentPage);
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  getListEvents(page) {
    this.questionSetupService.getListQuestions(page, this.paging.pageSize)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.questionList = result.data.results.map(this.formatQuestionList);
        this.paging.total = result.data.totalItems;
        this.paging.maxSize = result.data.totalPage;
      }, (error) => {
        this.handleErrorService.handleError(error);
      });
  }

  addNewQuestion() {
    if (this.questionSetId) {
      this.router.navigateByUrl('new-question?questionSetId=' + this.questionSetId);
    } else {
      this.notificationService.printErrorMessage('Please select a question set.');
    }
  }

  gotoDetail() {
    this.router.navigateByUrl('/new-question/' + this.itemsChecked[0].id );
  }

  selectQuestionSet(e) {
    this.questionSetId = e.id;
  }

  drawSwipeQuestion(points, correctAnwser, id) {

    setTimeout(() => {
      this.initD3Draw(points, correctAnwser, '.d3-draw-container-on-list._' + id + '_');
    }, 200);
  }
  initD3Draw(points, correctAnwser, id) {

    const iSelector = id;
    // create instance
    const instance = splotsFactory(iSelector);

    // init data points
    instance.points(points);

    // set readonly (in mode of preview)
    instance.readOnly(true);

    instance.width(300);

    instance.height(300);

    instance.render();

    instance.drawPath(correctAnwser);
  }
}
