import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewQuestionService } from './new-question.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { messageContstants } from '../core/contstants/message.constants';
import { NotificationService, HandleErrorService } from '../core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewQuestionComponent } from './preview-question/preview-question.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-new-question',
    templateUrl: './new-question.component.html',
    styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

    addQuestionForm: FormGroup;
    public pics: any;
    public pageTitle = 'Add New Question';
    public breadcrumb = 'Home\\ All Events \\ Add New Question';
    question: any;
    // questionStatus: any;
    states: any;

    questionType = 'physics_water';
    questionTypeSelectForEdit = null;
    isLoading = false;

    placeholderQT = 'Physics: Water';
    CData: any;
    id: number;
    dataQuestionType = [
        {
            id: 'physics_water',
            name: 'Physics: Water'
        },
        {
            id: 'artist_name',
            name: 'Artist Name'
        },
        {
            id: 'swipe_mission',
            name: 'Swipe Mission'
        }
    ];

    swipe = {
        swipeQuestion: [],
        swipeCorrectAnswer: [],
        swipeTarget: 'NUMBER',
        swipeOrder: 'ASCENDING'
    };

    priviewQPData = {
        questionBase64: '',
        answerFirstBase64: '',
        answerSecondBase64: '',
        answerThirdBase64: '',
        answerFourthBase64: '',
    };

    questionSetId = '';

    editCorrectAnswer: string;
    editQuestionPicture: any = {
        questionPic: null,
        answerPicFirst:  null,
        answerPicSecond: null,
        answerPicThird: null,
        answerPicFourth: null
    }

    constructor(
        private formBuilder: FormBuilder,
        private newQuestionService: NewQuestionService,
        private route: ActivatedRoute,
        private notificationService: NotificationService,
        private handleErrorService: HandleErrorService,
        private modal: NgbModal,
        private spinner: NgxSpinnerService

    ) { }

    ngOnInit() {
        this.questionSetId = this.route.snapshot.queryParamMap.get('questionSetId');
        const questionID = +this.route.snapshot.paramMap.get('id');
        if (questionID) {
            this.isLoading = true;
            this.id = questionID;
            this.newQuestionService.getQuestionByID(this.id).pipe(first())
                .subscribe((result: any) => {
                    this.isLoading = false;
                    this.question = result;
                    this.questionType = result.data.questionType;
                    if (result.data.questionType === 'swipe_mission') {
                        this.questionType = 'swipe_mission';
                        this.swipe = {
                            swipeQuestion: result.data.swipeQuestion,
                            swipeCorrectAnswer: result.data.swipeCorrectAnswer,
                            swipeTarget: result.data.swipeTarget ? result.data.swipeTarget.toUpperCase() : '',
                            swipeOrder: result.data.swipeOrder ? result.data.swipeOrder.toUpperCase() : ''
                        };
                        this.questionTypeSelected({ id: this.questionType });
                        this.questionTypeSelectForEdit = this.questionType;
                        this.formControl['questionEn'].setValue(this.question.data.questionEn);
                        this.formControl['questionCh'].setValue(this.question.data.questionCh);
                    } else {
                        this.questionTypeSelected({ id: this.questionType });
                        this.questionTypeSelectForEdit = this.questionType;
                        this.formControl['questionEn'].setValue(this.question.data.questionEn);
                        this.formControl['questionCh'].setValue(this.question.data.questionCh);
                        this.formControl['answerTextFirst'].setValue(this.question.data.answerTextFirst);
                        this.formControl['answerTextSecond'].setValue(this.question.data.answerTextSecond);
                        this.formControl['answerTextThird'].setValue(this.question.data.answerTextThird);
                        this.formControl['answerTextFourth'].setValue(this.question.data.answerTextFourth);
                        this.editCorrectAnswer = this.question.data.correctAnswer[0];
                        this.editQuestionPicture.questionPic = this.question.data.questionPic;
                        this.editQuestionPicture.answerPicFirst = this.question.data.answerPicFirst;
                        this.editQuestionPicture.answerPicSecond = this.question.data.answerPicSecond;
                        this.editQuestionPicture.answerPicThird = this.question.data.answerPicThird;
                        this.editQuestionPicture.answerPicFourth = this.question.data.answerPicFourth;
                    }
                },
                    error => {
                        this.isLoading = false;
                        this.handleErrorService.handleError(error);
                    });
        }
        this.addQuestionForm = this.formBuilder.group({
            id: [questionID],
            // questionStatus: ['enable'],
            states: ['enable'],
            questionType: [this.questionType],
            questionEn: [''],
            questionCh: [''],
            firstAnswer: [''],
            secondAnswer: [''],
            thirdAnswer: [''],
            fourthAnswer: [''],
            answerTextFirst: [''],
            answerTextSecond: [''],
            answerTextThird: [''],
            answerTextFourth: [''],
            answerTextAlign: ['left'],
            questionPicUpload: ['', Validators.required],
            answerPicFirstUpload: [''],
            answerPicSecondUpload: [''],
            answerPicThirdUpload: [''],
            answerPicFourthUpload: ['']
        });
    }
    get formControl() { return this.addQuestionForm.controls; }

    onSubmit() {

        if (this.questionType === 'swipe_mission') {

            this.processPostNewQuestion(this.addQuestionForm.value);

        } else {
            if (!this.editQuestionPicture.questionPic) {
                if (this.addQuestionForm.invalid) {
                    this.notificationService.printErrorMessage('Question picture can\'t be empty');
                    return;
                }
            }
            this.spinner.show();
            const postData = {
                questionSetId: this.questionSetId,
                ...this.addQuestionForm.value
            };
            this.newQuestionService.postNewQuestion(postData).pipe(first())
                .subscribe(data => {
                    this.spinner.hide();
                    if (this.id) {
                        this.notificationService.printSuccessMessage(messageContstants.UPDATED_OK_MSG);
                    } else {
                        this.notificationService.printSuccessMessage(messageContstants.CREATED_OK_MSG);
                    }
                },
                    error => {
                        this.spinner.hide();
                        this.handleErrorService.handleError(error);
                    });
        }
    }

    processPostNewQuestion(form) {
        this.spinner.show();
        const data: any = {
            id: this.id,
            // questionStatus: form.questionStatus,
            states: form.states,
            questionEn: form.questionEn,
            questionCh: form.questionCh,
            questionType: form.questionType,
            swipeQuestion: this.swipe.swipeQuestion,
            swipeCorrectAnswer: this.swipe.swipeCorrectAnswer,
            swipeTarget: this.swipe.swipeTarget,
            swipeOrder: this.swipe.swipeOrder
        };
        if (this.questionSetId) {
            data.questionSetId = this.questionSetId;
        }

        this.newQuestionService.postNewQuestionSwipe(data).subscribe((res) => {
            this.spinner.hide();
            if (this.id) {
                this.notificationService.printSuccessMessage(messageContstants.UPDATED_OK_MSG);
            } else {
                this.notificationService.printSuccessMessage(messageContstants.CREATED_OK_MSG);
            }
        }, (error) => {
            this.spinner.hide();
            this.handleErrorService.handleError(error);
        });
    }

    questionTypeSelected(e) {
        this.questionType = e.id;
        this.formControl['questionType'].setValue(e.id);
        this.addQuestionForm = this.formBuilder.group({
            id: [this.id],
            // questionStatus: ['enable'],
            states: ['enable'],
            questionType: [this.questionType],
            questionEn: [''],
            questionCh: [''],
            firstAnswer: [''],
            secondAnswer: [''],
            thirdAnswer: [''],
            fourthAnswer: [''],
            answerTextFirst: [''],
            answerTextSecond: [''],
            answerTextThird: [''],
            answerTextFourth: [''],
            answerTextAlign: ['left'],
            questionPicUpload: ['', Validators.required],
            answerPicFirstUpload: [''],
            answerPicSecondUpload: [''],
            answerPicThirdUpload: [''],
            answerPicFourthUpload: ['']
        });
    }

    onFilesUploadChanges(pics) {

        this.priviewQPData.questionBase64 = pics.questionBase64;
        this.priviewQPData.answerFirstBase64 = pics.answerFirstBase64;
        this.priviewQPData.answerSecondBase64 = pics.answerSecondBase64;
        this.priviewQPData.answerThirdBase64 = pics.answerThirdBase64;
        this.priviewQPData.answerFourthBase64 = pics.answerFourthBase64;

        if (pics.questionPic) {
            this.formControl['questionPicUpload'].setValue(pics.questionPic);
        }
        if (pics.answerPicFirst) {
            this.formControl['answerPicFirstUpload'].setValue(pics.answerPicFirst);
        }
        if (pics.answerPicSecond) {
            this.formControl['answerPicSecondUpload'].setValue(pics.answerPicSecond);
        }
        if (pics.answerPicThird) {
            this.formControl['answerPicThirdUpload'].setValue(pics.answerPicThird);
        }
        if (pics.answerPicFourth) {
            this.formControl['answerPicFourthUpload'].setValue(pics.answerPicFourth);
        }
    }

    previewQuestion() {
        if (this.questionType === 'swipe_mission') {
            if (!this.swipe.swipeQuestion || (this.swipe.swipeQuestion && this.swipe.swipeQuestion.length === 0)) {
                this.notificationService.printErrorMessage('Swipe question is required');
                return;
            }
            if (!this.swipe.swipeCorrectAnswer || (this.swipe.swipeCorrectAnswer && this.swipe.swipeCorrectAnswer.length === 0)) {
                this.notificationService.printErrorMessage('Swipe correct anwser is required');
                return;
            }
            const pass_data = {
                questionIndex: '',
                // questionStatus: this.addQuestionForm.value.questionStatus,
                states: this.addQuestionForm.value.states,
                questionEn: this.addQuestionForm.value.questionEn,
                questionCh: this.addQuestionForm.value.questionCh,
                questionType: this.addQuestionForm.value.questionType,
                swipeQuestion: this.swipe.swipeQuestion,
                swipeCorrectAnswer: this.swipe.swipeCorrectAnswer,
                swipeTarget: this.swipe.swipeTarget,
                swipeOrder: this.swipe.swipeOrder
            };
            sessionStorage.setItem('pass_data', JSON.stringify(pass_data));
            this.modal.open(PreviewQuestionComponent);

        } else {
            if (this.addQuestionForm.invalid) {
                this.notificationService.printErrorMessage('Question picture is required.');
                return;
            }
            if (this.questionType === 'physics_water') {
                const pass_data = {
                    questionIndex: '',
                    // questionStatus: this.addQuestionForm.value.questionStatus,
                    states: this.addQuestionForm.value.states,
                    questionEn: this.addQuestionForm.value.questionEn,
                    questionCh: this.addQuestionForm.value.questionCh,
                    questionType: this.addQuestionForm.value.questionType,
                    questionBase64: this.priviewQPData.questionBase64,
                    answerFirstBase64: this.priviewQPData.answerFirstBase64,
                    answerSecondBase64: this.priviewQPData.answerSecondBase64,
                    answerThirdBase64: this.priviewQPData.answerThirdBase64,
                    answerFourthBase64: this.priviewQPData.answerFourthBase64,
                    firstAnswer: this.addQuestionForm.value.firstAnswer,
                    secondAnswer: this.addQuestionForm.value.secondAnswer,
                    thirdAnswer: this.addQuestionForm.value.thirdAnswer,
                    fourthAnswer: this.addQuestionForm.value.fourthAnswer,
                    answerTextAlign: this.addQuestionForm.value.answerTextAlign
                };
                sessionStorage.setItem('pass_data', JSON.stringify(pass_data));
                this.modal.open(PreviewQuestionComponent);
            } else if (this.questionType === 'artist_name') {
                const pass_data = {
                    questionIndex: '',
                    // questionStatus: this.addQuestionForm.value.questionStatus,
                    states: this.addQuestionForm.value.states,
                    questionEn: this.addQuestionForm.value.questionEn,
                    questionCh: this.addQuestionForm.value.questionCh,
                    questionType: this.addQuestionForm.value.questionType,
                    questionBase64: this.priviewQPData.questionBase64,
                    answerTextFirst: this.addQuestionForm.value.answerTextFirst,
                    answerTextSecond: this.addQuestionForm.value.answerTextSecond,
                    answerTextThird: this.addQuestionForm.value.answerTextThird,
                    answerTextFourth: this.addQuestionForm.value.answerTextFourth,
                    firstAnswer: this.addQuestionForm.value.firstAnswer,
                    secondAnswer: this.addQuestionForm.value.secondAnswer,
                    thirdAnswer: this.addQuestionForm.value.thirdAnswer,
                    fourthAnswer: this.addQuestionForm.value.fourthAnswer,
                    answerTextAlign: this.addQuestionForm.value.answerTextAlign
                };
                sessionStorage.setItem('pass_data', JSON.stringify(pass_data));
                this.modal.open(PreviewQuestionComponent);
            }
        }

    }

}
