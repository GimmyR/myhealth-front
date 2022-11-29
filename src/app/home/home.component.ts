import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  oversights!: any[];

  constructor(private http: HttpClient, 
                private router: Router,
                  private route: ActivatedRoute) {
    // ça c'est pour spécifier que si l'URL change
    // ngOnInit sera réutilisé
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const keywords = this.route.snapshot.params["keywords"];
    if(keywords == null) {
      this.http.get("http://localhost:8000/api/home-index", { withCredentials: true })
        .subscribe((response: any) => {
          if(response.status == 0) {
            this.oversights = response.oversights;
          } else {
            this.router.navigateByUrl("sign-in");
          }
        });
    } else this.searchFor(keywords);
  }

  searchFor(keywords: string) {
    let body = { keywords: keywords };
    let options = { withCredentials: true };
    this.http.post("http://localhost:8000/api/search", body, options)
      .subscribe((response: any) => {
        if(response.status == 0)
          this.oversights = response.oversights;
        else if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else console.log(response);
      });
  }

}
