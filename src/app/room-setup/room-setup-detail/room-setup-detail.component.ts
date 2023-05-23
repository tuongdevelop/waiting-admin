import { Component, OnInit } from '@angular/core';
import { EventDetail } from '../../data-test/events-wating-detail';
import { RoomSetupService } from '../../room-setup/room-setup.service';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { NotificationService, HandleErrorService } from '../../core/services';

@Component({
	selector: 'app-room-setup-detail',
	templateUrl: './room-setup-detail.component.html',
	styleUrls: ['./room-setup-detail.component.scss']
})
export class RoomSetupDetailComponent implements OnInit {
	public pageTitle: string = "Questions Setup";
	public breadcrumb = "Home \\ Waiting Room Setup \\  ";

	alive = true;
	eventID = null;
	saleId: string = null;
	eventDemo = EventDetail;
	eventDetail: any;
	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	placeholder = "Select Use Queue";
	eventSetting: any = {
		event: {
			id: '',
			saleId: ''
		},
		userQueue: 'yes',
		announcement: '',
		soundAlert: 'yes',
		questionSetList: []
	};

	public accept = 'image/*';
	public file: File = null;
	public eventPictureUrl = '';

	public WEB_ROOT: string = '';

	constructor(
		private roomSetupService: RoomSetupService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService,
        private handleErrorService: HandleErrorService,
		private spinner: NgxSpinnerService
	) { 
		this.WEB_ROOT = environment.DOMAIN;
		this.getListQuestionsSet();
	}

	ngOnInit() {

		this.eventID = this.route.snapshot.paramMap.get('id');
		this.saleId = this.route.snapshot.queryParamMap.get('saleId');
		this.getEventSettingDetail(this.eventID, this.saleId);	

		this.dropdownSettings = {
			singleSelection: false,
			idField: 'id',
			textField: 'nameEn',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 4,
			allowSearchFilter: false
		};
	}

	getTicketDatetime(fromString: string, toString: string, timeString: string) {
		var fromDate = moment(fromString, 'YYYY MM DD');
		var toDate = moment(toString, 'YYYY MM DD');
		var startTime = moment(timeString, 'h:mma');
		if (fromDate === toDate) {
			return fromDate.format("DD MMMM YYYY") + ", " + startTime.format("h:mma");
		} else if (fromDate.format("YYYY") === toDate.format("YYYY") && fromDate.format("MM") === toDate.format("MM")) {
			return fromDate.format("DD") + " - " + toDate.format("DD MMMM YYYY") + ", " + startTime.format("h:mma");
		} else if (fromDate.format("YYYY") === toDate.format("YYYY")) {
			return fromDate.format("DD MMMM") + " - " + toDate.format("DD MMMM YYYY") + ", " + startTime.format("h:mma");
		}
		return fromDate.format("DD MMMM YYYY") + " - " + toDate.format("DD MMMM YYYY") + ", " + startTime.format("h:mma");
	}

	getOnSaleDatetime(fromString: string, toString: string) {
		var fromDate = moment(fromString, 'YYYY MM DD');
		var toDate = moment(toString, 'YYYY MM DD');
		if (fromDate === toDate) {
			return fromDate.format("DD MMM YYYY");
		} else if (fromDate.format("YYYY") === toDate.format("YYYY") && fromDate.format("MM") === toDate.format("MM")) {
			return fromDate.format("DD") + " - " + toDate.format("DD MMM YYYY");
		} else if (fromDate.format("YYYY") === toDate.format("YYYY")) {
			return fromDate.format("DD MMM") + " - " + toDate.format("DD MMM YYYY");
		}
		return fromDate.format("DD MMM YYYY") + " - " + toDate.format("DD MMM YYYY");
	}

	getListQuestionsSet() {
		this.roomSetupService.getListQuestionSets()
			.pipe(takeWhile(() => this.alive))
			.subscribe(result => {
				this.dropdownList = result.data;
			}, (error) => {
			});
	}

	getEventSettingDetail(eventId, saleId){
		this.roomSetupService.getEventSettingDetail(eventId, saleId)
			.pipe(takeWhile(() => this.alive))
			.subscribe(result => {
				this.eventDetail = result.data;
				this.fillForm(this.eventDetail);
			}, (error) => {
			});
	}

	fillForm(eventDetail) {
		this.eventSetting.event.id = eventDetail.event.id;
		this.eventSetting.event.saleId = eventDetail.event.saleId;
		this.eventSetting.id = eventDetail.id;
		this.eventPictureUrl = eventDetail.event.eventPoster;
		this.breadcrumb = this.breadcrumb + this.eventDetail.event.nameEn;

		this.selectedItems = eventDetail.questionSetDisplayList;
		this.eventSetting.soundAlert = eventDetail.soundAlert;
		this.eventSetting.userQueue = eventDetail.userQueue;
	}

	onSubmitEventSetting() {
		this.spinner.show();
		if (this.selectedItems && this.selectedItems.length) {
			let items = [];
			for (let key in this.selectedItems) {
				let value = this.selectedItems[key];
				items.push(value['id']);
			}
			this.eventSetting.questionSetList = items;
		}

		this.roomSetupService.updateEventSetting(this.eventSetting)
			.pipe(takeWhile(() => this.alive))
			.subscribe(result => {
				let eventId = result.data.event.id;
				let saleId = result.data.event.saleId;
				if (this.file) {
					this.roomSetupService.uploadPosterImage(eventId, saleId, this.file)
					.pipe(takeWhile(() => this.alive))
					.subscribe((rs) => {
						this.spinner.hide();
						this.notificationService.printSuccessMessage(rs.message);
					}, (err) => {
						this.spinner.hide();
						this.notificationService.printErrorMessage(err.err.message);
					});
				} else {
					this.spinner.hide();
					this.notificationService.printSuccessMessage(result.message);
				}
			}, (error) => {
				this.spinner.hide();
				this.notificationService.printErrorMessage(error.error.message);
			});
	}


	standardSaleType(lower: string) {
		let words = lower.replace('_', ' ');
		words = words.replace(/\b\w/g, function (l) { return l.toUpperCase() });
		return words;
	}

	toCapitalize(lower: string) {
		let result = lower.charAt(0).toUpperCase() + lower.substr(1);
		return result;
	}

	onItemSelect(item: any) {
	}
	onSelectAll(items: any) {
	}

	chooseAlert(value: string) {
		console.log(value);
		this.eventSetting.soundAlert = value;
	}

	onAnnounce($event) {
		$event.preventDefault();
		console.log("Announce");
	}

	onCancel($event) {
		$event.preventDefault();
		this.router.navigateByUrl('room-setup');
	}
	getLastestFile(file: any) {
		if (Array.isArray(file)) {
			return file.pop();
		}
		return file

	}
	fileChange(value) {
		let posterPic = this.getLastestFile(value);
	}
}
