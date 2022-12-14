import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  account!: any;
  keywords!: FormControl;
  isSearching!: boolean;

  constructor(private http: HttpClient, 
                private router: Router, 
                  private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.isSearching = false;
    this.keywords = new FormControl(null);
    if(this.route.snapshot.params["keywords"] != null)
      this.keywords = new FormControl(this.route.snapshot.params["keywords"]);
  }

  disconnect() {
    this.http.get(environment.url + "/api/sign-out", { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) 
          this.router.navigateByUrl("sign-in");
        else console.log(response);
      });
  }

  checkAccount() {
    this.http.get(environment.url + "/api/session-check", { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) {
          this.account = response.account;
        }
      });
  }

  search(e: Event) {
    e.preventDefault();
    if(this.keywords.value != null) {
      this.router.navigateByUrl("search/" + this.keywords.value);
    } else console.log("Mots clés de recherche inexistants !");
  }

  doSearch(e: Event) {
    e.preventDefault();
    this.isSearching = true;
  }

  closeSearch(e: Event) {
    e.preventDefault();
    this.isSearching = false;
  }

}
