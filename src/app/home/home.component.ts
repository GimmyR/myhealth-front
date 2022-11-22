import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  oversights!: any[];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8000/api/home-index", { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) {
          this.oversights = response.oversights;
        } else {
          this.router.navigateByUrl("sign-in");
        }
      });
  }

}
