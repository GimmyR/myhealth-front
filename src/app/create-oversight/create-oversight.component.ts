import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-oversight',
  templateUrl: './create-oversight.component.html',
  styleUrls: ['./create-oversight.component.scss']
})
export class CreateOversightComponent implements OnInit {

  title!: FormControl;

  parameters!: any[];

  constructor(private http: HttpClient, 
                private router: Router) {}

  ngOnInit(): void {
    //***********************************************************
    // ICI IL FAUT VERIFIER AVEC LE SERVEUR SI ON EST AUTHENTIFIE
    //***********************************************************

    this.title = new FormControl(null);
    
    this.parameters = [
      { name: new FormControl(null), unit: new FormControl(null) }
    ];
  }

  submit(e: Event) {
    e.preventDefault();
    const title: string = this.title.value;
    const parameters: any[] = [];
    this.parameters.forEach(function(parameter: any) {
      parameters.push({ name: parameter.name.value, unit: parameter.unit.value });
    });

    console.log(title);
    console.log(parameters);
  }

  addParameter(e: Event) {
    e.preventDefault();
    this.parameters.push(
      { name: new FormControl(''), unit: new FormControl('') }
    );
  }

  removeParameter(e: Event, i: number) {
    e.preventDefault();
    this.parameters.splice(i, 1);
  }

}
