import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MustMatch} from './_helpers/must-match.validator';
import { Employee } from '../models/employee';
import { UserauthService } from '../services/userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  data: Employee;

  constructor(private formBuilder: FormBuilder, public userauth:UserauthService, public router:Router) {
    this.data = new Employee();
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
          validator: MustMatch('password', 'confirmPassword')
      });
}

get f() { return this.registerForm.controls; }
onSubmit() {
  this.submitted = true;
  this.userauth.createItem(this.data).subscribe((response)=>
  this.router.navigate(['']));

  if (this.registerForm.invalid) {
    return;
  }

  
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

onReset() {
  this.submitted = false;
  this.registerForm.reset();
}
}
