import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ComponentFactory, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Params } from '../Params';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent {

  submissions: any[] = [];
  examDetails: any;

  searchResults: any[] = [];

  enableSearchContainer = false;
  showSearchResults = false;
  searchType: 'submissionid' | 'candidatename' | 'candidateemail' = 'candidatename';
  submissionsViewType: 'rows' | 'columns' = 'columns';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {


  }

  async ngOnInit() {

    this.route.queryParams.subscribe(async (data: any) => {

      const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

      const options: any = {

        headers: headers,
        params: {

          "examType": data.examType,
          "examId": data.examId

        },
        // responseType: 'text'

      }

      this.http.get(Params.SERVICE_BASE_URL + Params.EXAM_SERVICE_URL_SUFFIXS.GET_EXAM_SUBMISSIONS, options).subscribe({

        next: (value: any) => {

          if (value.success) {

            console.log(value)

            this.submissions = value.result;

          }

        }, error: (err) => {

          alert("Can't load submissions.")

        },

      })

      this.http.get(Params.SERVICE_BASE_URL + Params.EXAM_SERVICE_URL_SUFFIXS.GET_EXAM, options).subscribe({
        next: (result: any) => {

          this.examDetails = result.result;

          console.log(result)

        }, error: (error: any) => {


        }
      });

    });

  }

  viewResult(examType: string, examId: string, submissionId: string) {

    let navigationExtras: NavigationExtras = {
      queryParams: {

        'examType': examType,
        'examId': examId,
        'submissionId': submissionId

      }
    };

    //this.router.navigate([Params.PageNames.viewresult], navigationExtras);

    const link = this.router.serializeUrl(this.router.createUrlTree([Params.PageNames.viewresult], navigationExtras));
    window.open(link, '_blank');

  }

  toogleSubmissionsViewType() {

    this.submissionsViewType = this.submissionsViewType == 'rows' ? 'columns' : 'rows';

  }

  changeSearchType(e: any) {

    this.searchType = e.value;
    console.log(e)

  }

  getSearchInputPlaceholder(): string {

    switch (this.searchType) {

      case 'candidateemail': return 'Enter Candidate email'

      case 'candidatename': return 'Enter Candidate name'

      case 'submissionid': return 'Enter Submission id'

      default: return ''

    }

  }

  doSearch(searchKeyword: string) {

    this.showSearchResults = true;

    switch (this.searchType) {

      case 'candidateemail':

        this.searchResults = this.submissions.filter(element => (element.submittedBy.email.startsWith(searchKeyword)));

        break;

      case 'candidatename':

        this.searchResults = this.submissions.filter(element => (element.submittedBy.name.toLowerCase().includes(searchKeyword.toLowerCase())));

        break;

      case 'submissionid':

        this.searchResults = this.submissions.filter(element => (element._id == searchKeyword));

        break;

      default: break;

    }

  }

  formatDate(date: any) {

    date = new Date(date)

    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

  }

  formatTime(date: any) {

    date = new Date(date)

    return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  }
}
