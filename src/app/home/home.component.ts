import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isConnected!: boolean;
  oversights!: any[];

  constructor(private http: HttpClient, 
                private router: Router,
                  private route: ActivatedRoute) {
    // ça c'est pour spécifier que si l'URL change
    // ngOnInit sera réutilisé
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.isConnected = false;
    const keywords = this.route.snapshot.params["keywords"];
    if(keywords == null) {
      this.http.get(environment.url + "/api/home-index", { withCredentials: true })
        .subscribe((response: any) => {
          if(response.status == 0) {
            this.isConnected = true;
            this.oversights = response.oversights;
          } else this.router.navigateByUrl("sign-in");
        });
    } else this.searchFor(keywords);
  }

  searchFor(keywords: string) {
    let body = { keywords: keywords };
    let options = { withCredentials: true };
    this.http.post(environment.url + "/api/search", body, options)
      .subscribe((response: any) => {
        if(response.status == 0) {
          this.isConnected = true;
          this.oversights = response.oversights;
        } else if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else console.log(response);
      });
  }

}
