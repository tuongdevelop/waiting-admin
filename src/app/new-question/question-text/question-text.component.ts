import {Input, Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-question-text',
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.scss']
})
export class QuestionTextComponent implements OnInit, AfterViewInit {
  @Input()
  parentForm: FormGroup;

  @Input()
  editCorrectAnswer: string;

  @Input()
  editQuestionPicture: any;

  @Output() filesChangeOutPut = new EventEmitter();

  accept = 'image/*';
  public questionPic: File;
  public answerPicFirst: File = null;
  public answerPicSencond: File = null;
  public answerPicThird: File = null;
  public answerPicFourth: File = null;

  public questionBase64 = '';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setCorrectAnswerWhenEdit();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
  }

  getLastestFile(file: any) {
    if (Array.isArray(file)) {
      return file.pop();
    }
    return file;

  }
  fileChange(value, id?) {
    setTimeout(() => {
      const pictures = {
        questionPic: '',
        answerPicFirst: '',
        answerPicSecond: '',
        answerPicThird: '',
        answerPicFourth: '',
        questionBase64: this.questionBase64
      };
      switch (id) {
        case 0:
          pictures.questionPic = this.getLastestFile(value);
          break;
        case 1:
          pictures.answerPicFirst = this.getLastestFile(value);
          break;
        case 2:
          pictures.answerPicSecond = this.getLastestFile(value);
          break;
        case 3:
          pictures.answerPicThird = this.getLastestFile(value);
          break;
        case 4:
          pictures.answerPicFourth = this.getLastestFile(value);
          break;
        default:
          break;
      }
      this.filesChangeOutPut.emit(pictures);
    }, 200);
  }

  setCorrectAnswerWhenEdit() {
    if (this.editCorrectAnswer === 'first') {
    } else if (this.editCorrectAnswer === 'second') {
    } else if (this.editCorrectAnswer === 'third') {
    } else if (this.editCorrectAnswer === 'fourth') {
    }
  }

}
