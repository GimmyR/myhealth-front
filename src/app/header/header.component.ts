import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {}

  create() {
    console.log("CREATE !");
  }

  disconnect() {
    this.http.get("http://localhost:8000/api/sign-out")
      .subscribe((response) => {
        console.log(response);
      });
  }

}
