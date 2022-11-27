import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  disabledForm:any = {};
  modalForm: any = {};

  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8000/api/session-check", { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else this.setDisabledForm(response);
      });
  }

  setDisabledForm(response: any) {
    this.disabledForm.firstname = new FormControl({value: response.account.firstname, disabled: true});
    this.disabledForm.lastname = new FormControl({value: response.account.lastname, disabled: true});
    this.disabledForm.email = new FormControl({value: response.account.email, disabled: true});
    this.disabledForm.password = new FormControl({value: response.account.password, disabled: true});
  }

  changeFirstname() {
    this.modalForm = {
      firstname: new FormControl(this.disabledForm.firstname.value),
      password: new FormControl(null)
    };
  }

  changeLastname() {
    this.modalForm = {
      lastname: new FormControl(this.disabledForm.lastname.value),
      password: new FormControl(null)
    };
  }

  changeEmail() {
    this.modalForm = {
      email: new FormControl(this.disabledForm.email.value),
      password: new FormControl(null)
    };
  }

  changePassword() {
    this.modalForm = {
      password: new FormControl(null),
      newPassword: new FormControl(null)
    };
  }

  save() {
    let body: any = { password: this.modalForm.password.value };

    if(this.modalForm.firstname != null)
      body.firstname = this.modalForm.firstname.value;
    else if(this.modalForm.lastname != null)
      body.lastname = this.modalForm.lastname.value;
    else if(this.modalForm.email != null)
      body.email = this.modalForm.email.value;
    else if(this.modalForm.newPassword != null)
      body.newPassword = this.modalForm.newPassword.value;
    else console.log("Erreur ?");

    this.http.post("http://localhost:8000/api/account-edit", body, { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) {
          this.setDisabledForm(response);
        } else console.log(response);
      });
  }

}
