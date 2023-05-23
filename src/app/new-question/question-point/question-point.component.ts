import { Component, OnInit, Input } from '@angular/core';

declare var splotsFactory: any;
declare var $: any;
import * as _ from 'underscore';

@Component({
  selector: 'app-question-point',
  templateUrl: './question-point.component.html',
  styleUrls: ['./question-point.component.scss']
})
export class QuestionPointComponent implements OnInit {

  instance: any;
  points = [];
  correctAnwser = [];

  typePointValue = 1;

  @Input()
  swipeData: any;

  constructor() { }

  ngOnInit() {
    this.points = this.swipeData.swipeQuestion;
    this.correctAnwser = this.swipeData.swipeCorrectAnswer;
    setTimeout(() => {
      this.initD3Draw();
    }, 100);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

  }

  initD3Draw() {

    const self = this;

    // create instance
    this.instance = splotsFactory('.d3-draw-container');

    // init data points
    self.instance.points(self.points);

    // set readonly (in mode of preview)
    self.instance.readOnly(false);

    self.instance.width(300);

    self.instance.height(300);

    self.instance.swept((x) => {
      self.instance.clearPath();
      self.swipeData.swipeCorrectAnswer = x;
    });

    self.instance.clickNoPoint(function (x, y) {
      self.instance.clearPath();
      const value = self.getValue();
      if (value) {
        self.points.push({ x: x, y: y, value: value });
        self.instance.points(self.points);
        self.instance.render();
        self.swipeData.swipeQuestion = self.points;
      }
    });

    // self.instance.dblClick(function(d){
    //   self.instance.points(points = _.reject(points, d));
    //   self.instance.render();
    // });

    self.instance.click(function (d) {
      self.instance.clearPath();
      self.instance.points(self.points = _.reject(self.points, d));
      self.instance.render();
      self.swipeData.swipeQuestion = self.points;
      // console.log('click', self.swipeData);
    });

    self.instance.render();

    if (this.correctAnwser && this.correctAnwser.length > 0) {
      self.instance.drawPath(this.correctAnwser);
    }
  }

  getValue() {
    switch (this.typePointValue) {
      case 1:
        return this.getNumberValue();
      case 2:
        return this.getAlphabetValue();
      case 3:
        return this.getRandomValue();
      default:
        return null;
    }
  }

  getNumberValue() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i < arr.length; i++) {
      let hasIt = false;
      for (let j = 0; j < this.points.length; j++) {
        if (arr[i] === this.points[j].value) {
          hasIt = true;
        }
      }
      if (hasIt) {
        continue;
      } else {
        return arr[i];
      }
    }
    return null;
  }

  getAlphabetValue() {
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (let i = 0; i < arr.length; i++) {
      let hasIt = false;
      for (let j = 0; j < this.points.length; j++) {
        if (arr[i] === this.points[j].value) {
          hasIt = true;
        }
      }
      if (hasIt) {
        continue;
      } else {
        return arr[i];
      }
    }
    return null;
  }

  getRandomValue() {
    const min = 1;
    const max = 3;
    const rndInteger = Math.floor(Math.random() * (max - min)) + min;
    // if (this.points && this.points.length < 10) {
      if (rndInteger === 1) {
        return this.getNumberValue();
      } else {
        return this.getAlphabetValue();
      }
    // } else {
    //   return null;
    // }
  }

  setTypePointValue(type) {
    this.typePointValue = type;
  }

  clearPoints() {
    this.points = [];
    this.instance.clearSweptPath();
    this.instance.points(this.points);
    this.instance.render();
  }
}
