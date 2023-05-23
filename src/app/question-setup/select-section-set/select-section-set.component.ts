import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { QuestionSetService } from './question-set.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    selector: 'app-select-section-set',
    templateUrl: './select-section-set.component.html',
    styleUrls: ['./select-section-set.component.scss']
})
export class SelectSectionSetComponent implements OnInit {

    @Output()
    selectQuestionSet: EventEmitter<any> = new EventEmitter();

    public questionSetList = [];
    alive = true;
    public isOpen = false;
    public questionSetSelected = 'Select Question Set';

    isAddNew = false;
    questionSetText = '';

    constructor(
        private questionSetSVN: QuestionSetService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.getListQuestionSet();
    }

    openSelect() {
        this.isOpen = !this.isOpen;
    }

    selected(val) {
        this.questionSetSelected = val.nameEn;
        this.isOpen = false;
        this.selectQuestionSet.emit(val);
    }
    getListQuestionSet() {
        this.questionSetSVN.getListQuestionSet()
            .pipe(takeWhile(() => this.alive))
            .subscribe(result => {
                this.questionSetList = result.data;
            }, (error) => {
            });
    }

    turnOnAddNew() {
        this.isAddNew = true;
    }
    AddNew() {
        if (this.questionSetText) {
            this.addNewQuestionSet();
        } else {
            this.notifyService.printErrorMessage('Question set name is required.');
        }
    }

    addNewQuestionSet() {
        const data = {
            nameEn: this.questionSetText,
            questionList: []
        };
        this.questionSetSVN.addNewQuestionSet(data)
            .pipe(takeWhile(() => this.alive))
            .subscribe(result => {
                this.isAddNew = false;
                this.questionSetText = '';
                this.getListQuestionSet();
            }, (error) => {
                this.questionSetText = '';
                this.isAddNew = false;
            });
    }

    deleteQuestionSet(event, id) {

        this.questionSetSVN.deleteQuestionSet(id)
            .pipe(takeWhile(() => this.alive))
            .subscribe(result => {
                this.getListQuestionSet();
            }, (error) => {
            });
    }

    turnOnEdit(item) {
        this.questionSetList.forEach((element) => {
            element.isEdit = false;
        });
        item.isEdit = true;
    }
    EditNew(item) {
        // console.log(item);
        this.editQuestionSet(item);
    }

    editQuestionSet(item) {
        const data = {
            id: item.id,
            nameEn: item.nameEn,
            questionList: []
        };
        this.questionSetSVN.addNewQuestionSet(data)
            .pipe(takeWhile(() => this.alive))
            .subscribe(result => {
                item.isEdit = false;
                this.getListQuestionSet();
            }, (error) => {
                item.isEdit = false;
            });
    }
}
