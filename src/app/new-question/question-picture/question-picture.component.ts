import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
    selector: 'app-question-picture',
    templateUrl: './question-picture.component.html',
    styleUrls: ['./question-picture.component.scss']
})
export class QuestionPictureComponent implements OnInit {
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
    public answerFirstBase64 = '';
    public answerSecondBase64 = '';
    public answerThirdBase64 = '';
    public answerFourthBase64 = '';

    constructor() { }

    ngOnInit() {
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
                questionBase64: this.questionBase64,
                answerFirstBase64: this.answerFirstBase64,
                answerSecondBase64: this.answerSecondBase64,
                answerThirdBase64: this.answerThirdBase64,
                answerFourthBase64: this.answerFourthBase64,

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

}
