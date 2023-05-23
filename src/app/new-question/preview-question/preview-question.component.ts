import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-preview-question',
    templateUrl: './preview-question.component.html',
    styleUrls: ['./preview-question.component.scss']
})
export class PreviewQuestionComponent implements OnInit {

    question_preview: any;

    constructor(public activeModal: NgbActiveModal) {
        this.question_preview = sessionStorage.getItem('pass_data');
        if (this.question_preview) {
            this.question_preview = JSON.parse(this.question_preview);
        }
    }

    ngOnInit() {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges() {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        sessionStorage.removeItem('pass_data');
    }
}
