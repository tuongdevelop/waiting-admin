import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var splotsFactory: any;

@Component({
    selector: 'app-question-type',
    templateUrl: './question-type.component.html',
    styleUrls: ['./question-type.component.scss']
})
export class QuestionTypeComponent implements OnInit {
    answerSelected: any;

    swipeCorrectAnswer: any[] = [];

    constructor() { }

    @Input()
    question: any;

    ngOnInit() {

        if (this.question.questionType === 'swipe_mission') {
            const points = this.question.swipeQuestion;
            const correctAnwser = this.question.swipeCorrectAnswer;
            setTimeout(() => {
                this.initD3Draw(points, correctAnwser);
            }, 300);
        }

        this.chooseCorrectAnswer();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges() {
        this.answerSelected = null;
    }

    chooseCorrectAnswer() {
        if (this.question.firstAnswer) {
            this.answerSelected = 'first';
        } else if (this.question.secondAnswer) {
            this.answerSelected = 'second';
        } else if (this.question.thirdAnswer) {
            this.answerSelected = 'third';
        } else if (this.question.fourthAnswer) {
            this.answerSelected = 'fourth';
        }
    }

    initD3Draw(points, correctAnwser) {

        // create instance
        const instance = splotsFactory('.d3-draw-container.preview');

        // init data points
        instance.points(points);

        // set readonly (in mode of preview)
        instance.readOnly(true);

        instance.width(300);

        instance.height(300);

        instance.swept((x) => {
            // console.log('swept', x);
            this.swipeCorrectAnswer = x;
        });

        instance.render();

        instance.drawPath(correctAnwser);
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
    }

}
