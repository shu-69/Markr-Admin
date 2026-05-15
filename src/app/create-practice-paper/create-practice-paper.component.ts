import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Params } from '../Params';
import { GlobalVar } from '../GlobalVar';

import { PracticePaper, Question, Test } from '../TestsParams'
import { ActivatedRoute } from '@angular/router'; 
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { QuestionImagePickerComponent } from '../components/question-image-picker/question-image-picker.component';

@Component({
  selector: 'app-create-practice-paper',
  templateUrl: './create-practice-paper.component.html',
  styleUrls: ['./create-practice-paper.component.scss']
})
export class CreatePracticePaperComponent {

  pageTitle = "Create Practice Paper"
  isEditing = false;

  title = '';
  passMarks : number | undefined;
  description = '';
  timeinseconds = 0;

  timeInString: string = '00:00';

  withoutTime: boolean = false;
  negativeMarking: boolean = false;
  isActive: boolean = false;

  questions: Question[] = [];

  menuTopLeftPosition = { x: 0, y: 0 }

  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, public dialog: MatDialog) {


  }

  ngOnInit() {

    this.route.queryParams.subscribe((params: any) => {

      //console.log(params)

      if (params) {

        if (params.isEditing) {

          this.pageTitle = "Edit Practice Paper";
          this.isEditing = true;

          let paper: PracticePaper = JSON.parse(params.paper);

          this.title = paper.title;
          this.passMarks = paper.pass_marks,
          this.description = paper.description;
          this.timeinseconds = paper.time;
          this.timeInString = this.changeSecondsToTime(paper.time);
          this.withoutTime = paper.is_without_time;
          this.isActive = paper.isActive;
          this.negativeMarking = paper.negativeMarking;

          this.questions = paper.questions;

          // console.log(this.title, this.description, this.timeinseconds, this.timeInString, this.withoutTime, this.isActive,)

        }

      }

    });

  }

  ngOnDestroy() {

  }

  setTimeInSeconds(e: any) {

    let time: string = e.target.value;

    let hours: any = time.substring(0, time.indexOf(':'));

    let minutes: any = time.substring(time.indexOf(':') + 1, time.length);

    this.timeinseconds = hours * 3600 + minutes * 60;

    //console.log(time, hours, minutes, this.timeinseconds);

  }

  async submit() {

    if (await this.checkErrors()) {

      let body = {

        'title': this.title,
        'description': this.description,
        'pass_marks': this.passMarks,
        'time': this.timeinseconds,
        'is_without_time': this.withoutTime,
        'isActive': this.isActive,
        'negativeMarking' : this.negativeMarking,
        'details': {
          'added_by': GlobalVar.username,
          'added_on': new Date().toString(),
        },
        'marks': await this.getTotalPositiveMarks(),
        'questions': this.questions,
        'submissions': []

      }

      //console.log("🚀 Done", body , JSON.stringify(body))

      const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

      this.http.post<any>(Params.SERVICE_BASE_URL + Params.EXAM_SERVICE_URL_SUFFIXS.CREATE_PRACTICE_PAPER, body, { headers }).subscribe({
        next: data => {

          console.log(data)

          if (data.success) {

            alert('🚀 Practice Paper added successfuly!')

            this.location.back();

          } else {

            alert('Practice Paper adding failed!')

          }

        },
        error: error => {
          alert(error)
          console.error('There was an error!', error);
        }
      });

    }

  }

  async update() {

    if (await this.checkErrors()) {

      let body = {

        'title': this.title,
        'time': this.timeinseconds,
        'pass_marks': this.passMarks,
        'is_without_time': this.withoutTime,
        'isActive': this.isActive,
        'negativeMarking' : this.negativeMarking,
        'details': {
          'added_by': await this.getEditingTest().details.added_by,
          'added_on': await this.getEditingTest().details.added_on,
          'updated_by': GlobalVar.username,
          'updated_on': new Date().toString(),
        },
        'marks': await this.getTotalPositiveMarks(),
        'questions': this.questions,

      }

      //console.log("🚀 Done", body)

      const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

      const options: any = {

        headers: headers,
        params: { "examId": await this.getEditingTest()._id, "examType": "practice_paper" },
        // responseType: 'text'

      }

      this.http.post<any>(Params.SERVICE_BASE_URL + Params.EXAM_SERVICE_URL_SUFFIXS.UPDATE_EXAM, body, options).subscribe({
        next: (data : any) => {

          console.log(data)
          alert('🚀 Practice Paper updated successfuly!')

        },
        error: error => {
          alert(JSON.stringify(error))
          console.error('There was an error!', error);
        }
      });

    }

  }

  async checkErrors(): Promise<boolean> {

    if (this.title == undefined || this.title.trim().length == 0) {
      alert('Enter test title');
      return false;
    }

    if (!this.withoutTime && (this.timeinseconds == undefined || this.timeinseconds == 0)) {
      alert('Enter test time');
      return false;
    }

    if(!this.passMarks){
      alert('Enter pass marks');
      return false;
    }

    if(this.passMarks > await this.getTotalPositiveMarks() || this.passMarks < 0){
      alert('Enter valid pass marks');
      return false;
    }

    if (this.questions == undefined || this.questions.length == 0) {
      alert('No questions added!');
      return false;
    }

    for (let i = 0; i < this.questions.length; i++) {

      let element = this.questions[i];

      if (element.body.trim().length == 0) {
        alert('Enter question at index ' + (i + 1));
        return false;
      }

      if (element.marks.positive == undefined || element.marks.positive <= 0 || typeof element.marks.positive != 'number') {
        alert('Enter valid marks at index ' + (i + 1));
        return false;
      }

      if (this.negativeMarking) {

        if (element.marks.negative == undefined || element.marks.negative > 0 || typeof element.marks.negative != 'number') {
          alert('Enter valid negative marks at index ' + (i + 1));
          return false;
        }

      }

      switch (element.answer_type) {

        case 'options':

          if (element.answer_content.correct_answer == -1) {
            alert('Enter correct answer at index ' + (i + 1));
            return false;
          }

          break;

        case 'boolean':

          if (element.answer_content.correct_answer == undefined) {
            alert('Enter correct answer at index ' + (i + 1));
            return false;
          }

          break;

        case 'oneword':

          if (element.answer_content.correct_answer == undefined || element.answer_content.correct_answer == '') {
            alert('Enter correct answer at index ' + (i + 1));
            return false;
          }

          if (element.answer_content.correct_answer.includes(' ')) {
            alert('Remove spaces from correct answer at index ' + (i + 1));
            return false;
          }

          break;

        default:

          alert('Choose answer type at ' + (i + 1));
          return false;

      }

    }

    return true;
  }

  getEditingTest(): any {

    let paper: PracticePaper | undefined = undefined;

    this.route.queryParams.subscribe(async (params: any) => {

      paper = JSON.parse(params.paper);

    });

    return paper;

  }

  changeSecondsToTime(seconds: number): string {

    seconds = Number(seconds);

    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var hDisplay = h.toString().length == 1 ? '0' + h : h;
    var mDisplay = m.toString().length == 1 ? '0' + m : m;

    return hDisplay + ':' + mDisplay;

  }

  async getTotalPositiveMarks() {

    let marks = 0;

    await this.questions.forEach(element => {

      marks += element.marks.positive

    });

    return marks;

  }

  showError(msg: string) {

    alert(msg);

  }

  showQuestion(question: Question) {

    console.log(question);

  }

  removeQuestion(question: Question){

    this.questions = this.questions.filter(element => element != question);

  }

  changeFlotingContainerPosition(container : HTMLElement, positionArrowContainer: HTMLElement, position : 'left' | 'right'){


    switch(position){

      case 'left' :

      container.classList.remove('right');
      container.classList.add('left');

      positionArrowContainer.classList.remove('left');
      positionArrowContainer.classList.add('right');

      break;

      case 'right' :

      container.classList.remove('left');
      container.classList.add('right');

      positionArrowContainer.classList.remove('right');
      positionArrowContainer.classList.add('left');

      break;

    }

  }

  changeQuestionIndex(old_index: number, new_index: number) {

    if (new_index < 0) {
      return;
    }

    if (new_index >= this.questions.length) {
      return;
    }

    this.questions.splice(new_index, 0, this.questions.splice(old_index, 1)[0]); 

  }

  changeAnswerType(e: any, question: Question) {

    console.log(e.value);

    let answerType = e.value;

    switch (answerType) {

      case 'options':

        question.answer_content = { "options": [{ 'value': 'Option 1' }, { 'value': 'Option 2' }, { 'value': 'Option 3' }, { 'value': 'Option 4' }], "correct_answer": -1 };

        break;

      case 'boolean':

        question.answer_content = { "correct_answer": undefined };

        break;

      case 'oneword':

        question.answer_content = { "correct_answer": undefined };

        break;

      default: break;

    }

  }

  addOption(question: Question) {

    if (question.answer_content.options.length >= 6)
      return;

    question.answer_content.options.push({ 'value': 'Option ' + (question.answer_content.options.length + 1) });

  }

  removeOption(question: Question) {

    if (question.answer_content.options.length <= 2)
      return;

    question.answer_content.options.pop();
  }

  openQuestionImageSelector(question: Question, edit?: Boolean) {

    const dialogRef = this.dialog.open(QuestionImagePickerComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        if (result.src != "") {
          question.images.push(result);
        }
      }

    });

  }

  onQuestionImageRightClick(event: MouseEvent, question: Question, image: any) {

    event.preventDefault();

    this.menuTopLeftPosition.x = event.clientX;
    this.menuTopLeftPosition.y = event.clientY;

    this.matMenuTrigger.menuData = { data: { question: question, image: image } }

    this.matMenuTrigger.openMenu();

  }

  deleteQuestionImage(question: Question, image: any) {

    question.images = question.images.filter(element => element != image);

  }

  addBlankQuestion() {

    this.questions.push({ 
      "body": "", "marks": { "positive": 1, "negative": 0 }, "answer_type": "options", "images": [],
      "answer_content": { "options": [{ 'value': 'Option 1' }, { 'value': 'Option 2' }, { 'value': 'Option 3' }, { 'value': 'Option 4' }], "correct_answer": -1 }
    });

  }

  getAlphabet(index: number): string {

    let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    return alphabets[index];

  }

  goBack() {

    this.location.back();

  }


}
