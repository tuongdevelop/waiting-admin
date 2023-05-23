import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService, HandleErrorService } from '../core/services';
import { QuestionSetService } from '../question-set-setup/question-set-setup.service';

@Component({
  selector: 'app-new-question-set',
  templateUrl: './new-question-set.component.html',
  styleUrls: ['./new-question-set.component.scss']
})
export class NewQuestionSetComponent implements OnInit {

  addQuestionSetForm: FormGroup;
  questionSetId = null;
  public pics: any;
  public pageTitle = 'Add New Question Set';
  public breadcrumb = 'Home\\ Question Set Setup \\ Add New Question Set';

  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private handleErrorService: HandleErrorService,
    private questionSetService: QuestionSetService
  ) {
    this.questionSetId = this.route.snapshot.paramMap.get('id');
    if (this.questionSetId) {
      this.getDetailQuestionSet(this.questionSetId);
    }
    this.addQuestionSetForm = this.formBuilder.group({
      states: ['enable'],
      asDefaultQuestionSet: ['no'],
      questionSetName: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  getDetailQuestionSet(id) {
    this.questionSetService.getDetailQuestionSet(id).subscribe((result) => {
      this.fillForm(result.data);
    }, (error) => {
      this.handleErrorService.handleError(error);
    });
  }

  fillForm(data) {
    this.addQuestionSetForm.controls['states'].setValue(data.states);
    this.addQuestionSetForm.controls['asDefaultQuestionSet'].setValue(data.defaultQuestionSet);
    this.addQuestionSetForm.controls['questionSetName'].setValue(data.nameEn);
  }

  addNewQuestionSet() {
    if (this.addQuestionSetForm.valid) {
      const data = {
        id: this.questionSetId,
        nameEn: this.addQuestionSetForm.value.questionSetName,
        states: this.addQuestionSetForm.value.states,
        defaultQuestionSet: this.addQuestionSetForm.value.asDefaultQuestionSet
      };
      this.questionSetService.addNewQuestionSet(data).subscribe((result) => {
        if (!this.questionSetId) {
          this.notificationService.printSuccessMessage('Create question set successful.');
        } else {
          this.notificationService.printSuccessMessage('Update question set successful.');
        }
        this.router.navigateByUrl('question-set-setup');
      }, (error) => {
        if (error.status === 406) {
          this.notificationService.printErrorMessage('This question set name is duplicated.');
        } else {
          this.handleErrorService.handleError(error);
        }
      });
    } else {
      this.notificationService.printErrorMessage('The question set name is required.');
    }
  }
}
