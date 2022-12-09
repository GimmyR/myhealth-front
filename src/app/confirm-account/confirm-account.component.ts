import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(private http: HttpClient, 
              private router: Router, 
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    let options = { withCredentials: true };
    this.http.get(environment.url + "/api/confirm-account/" + this.route.snapshot.params['confirm'], options)
      .subscribe((response: any) => {
        if(response.status == 0)
          this.router.navigateByUrl("");
        else if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else console.log(response);
      });
  }

}
