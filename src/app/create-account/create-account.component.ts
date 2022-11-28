import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  firstname!: FormControl;
  lastname!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirm!: FormControl;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.firstname = new FormControl(null);
    this.lastname = new FormControl(null);
    this.email = new FormControl(null);
    this.password = new FormControl(null);
    this.confirm = new FormControl(null);
  }

}
