import { Component } from '@angular/core';
import { Router } from '@angular/router';
import service_params from 'src/assets/json/service_params.json';
import { Params } from './Params';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CrecomOnlineAdminPanel';

  constructor(private router: Router, private http: HttpClient) {

    // this.http.get("/assets/json/service_params.json").subscribe({

    //   next : ((data: any) => {

    //     Params.SERVICE_BASE_URL = data.SERVICE_BASE_URL

    //     console.log(Params.SERVICE_BASE_URL, data)

    //   })

    // })

  }

}
