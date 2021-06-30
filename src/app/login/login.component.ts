import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserauthService } from '../services/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    loading = false;
    submitted = false;
   

  constructor(private formBuilder: FormBuilder, private userauth1:UserauthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.loginForm.valid) {
        this.userauth1.login(this.loginForm.value).subscribe(result => {
          if(result.success) {
            console.log(result);
            alert(result.message);
          }else {
            alert(result.message)
          }
        });
          return;
      }
}
}
