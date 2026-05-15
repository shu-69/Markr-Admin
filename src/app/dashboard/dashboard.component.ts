import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Params } from '../Params';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  textElementIds = {

    'totalAccountsLabelId': 'totalAccounts',
    'totalCoursesLabelId': 'totalCourses'

  }

  constructor(private http: HttpClient) {

    const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

      const options: any = {

        headers: headers
        // responseType: 'text'

      }

    // Loading all accounts

    this.http.get(Params.SERVICE_BASE_URL + Params.ACCOUNT_SERVICE_URL_SUFFIXS.GET_TOTAL_ACCOUNTS, options).subscribe({

      next: (value: any) => {

        if (value.success) {

          this.startNumberAnimation(0, value.result, 20, this.textElementIds.totalAccountsLabelId);

        }

      },

    })

  }

  startNumberAnimation(from: number, to: number, ms: number, textElementId: string) {

    let element = document.getElementById(textElementId)!;

    const increment = 1;
    
    let currentValue = from; 
    
    const updateValue = () => {

      currentValue += increment;
      
      if ((increment >= 0 && currentValue >= to) || (increment < 0 && currentValue <= to)) {
        currentValue = to; 
        clearInterval(intervalId); 
      }
    
      element.innerText = currentValue.toString().padStart(3, '0');

      if (currentValue === to) {
        clearInterval(intervalId);
      }
    };
  
    const intervalId = setInterval(updateValue, ms);

  }



}
