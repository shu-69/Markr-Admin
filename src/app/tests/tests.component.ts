import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Params } from '../Params';
import { Question, Test } from '../TestsParams'

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent {

  tests: Test[] = []

  constructor(private router: Router, private http: HttpClient) {

    this.loadTests()

  }

  loadTests() {

    const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

    const options: any = {

      headers: headers,
      params: {},
      // responseType: 'text'

    }

    this.http.get(Params.SERVICE_BASE_URL + Params.EXAM_SERVICE_URL_SUFFIXS.GET_TESTS, options).subscribe({
      next: (result: any) => {

        this.tests = result;

        // result.forEach((element: any, index: number) => {

        //   console.log(index, element._id, element)

        // });


      }, error: (error: any) => {

        console.log(error);
        alert(error);

      }
    });

  }

  toggleTestStatus(test: Test, event: any) {

    let isActive = event.target.checked;

    const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

    const options: any = {

      headers: headers,
      params: {
        'examType': 'test',
        'examId': test._id,
        'isActive': isActive
      },
      // responseType: 'text'

    }

    this.http.post<any>(Params.SERVICE_BASE_URL + Params.EXAM_SERVICE_URL_SUFFIXS.TOGGLE_EXAM_STATUS, undefined, options).subscribe({
      next: (result: any) => {

        if (result) {

          if (result.success && result.result.modifiedCount > 0) {

            test.isActive = isActive;

          } else {

            alert("Test status not updated : " + JSON.stringify(result))

          }

        } else {

        }

      }, error: (error: any) => {

        console.log(error);
        alert(JSON.stringify(error));

      }
    });


  }

  editTest(test: Test) {

    let navigationExtras: NavigationExtras = {
      queryParams: { 'isEditing': true, 'test': JSON.stringify(test) }
    };

    this.router.navigate(['create-test'], navigationExtras);

  }

  deleteTest(test: Test) {

    if(confirm("Are you sure to delete this test?")) {

      const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

      const options: any = {
  
        headers: headers,
        params: {
          'examType': 'test',
          'examId': test._id,
        },
        // responseType: 'text'
  
      }

      this.http.delete(Params.SERVICE_BASE_URL + Params.EXAM_SERVICE_URL_SUFFIXS.DELETE_EXAM, options).subscribe({
        next: (result: any) => {
  
          if (result) {
  
            if (result.success && result.result.deletedCount > 0) {

              this.tests = this.tests.filter(element => element._id != test._id);
  
            } else {
  
              alert("Test not deleted : " + JSON.stringify(result))
  
            }
  
          } else {
  
          }
  
        }, error: (error: any) => {
  
          console.log(error);
          alert(JSON.stringify(error));
  
        }
      });


    }

  }

  getTestTime(withoutTime: Boolean, seconds: number): string {

    if (withoutTime || seconds == 0)
      return 'No time'
    else
      return this.changeSecondsToTime(seconds)

  }

  changeSecondsToTime(seconds: number): string {

    seconds = Number(seconds);

    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours") : "0 hour, ";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    return hDisplay + mDisplay;

  }

  changeDateFormat(dateStr: string): string {

    let date = new Date(dateStr);

    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '  ' +
      date.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  }

  openSubmissions(examType: 'test' | 'practice_paper', examId: string) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        examType: examType,
        examId: examId
      }
    };

    const link = this.router.serializeUrl(this.router.createUrlTree(['submissions'], navigationExtras));
    window.open(link, '_blank');

  }

  openPage(pagePath: string) {

    this.router.navigateByUrl(pagePath);

  }

}
