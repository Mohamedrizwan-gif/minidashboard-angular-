import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onsubmit(): void {
    const dbusers = localStorage.getItem('dbusers');
    if(!this.loginForm.valid) {
      alert('Please provide valid username or password');
    }
    const { email, password } = this.loginForm.value;
    if (dbusers === null) {
      alert('Please register to continue');
      return;
    }
    if (dbusers !== null) {
      let users = JSON.parse(dbusers);
      const checkemail = users.filter((user: any) => user.email === 'email');
      const checkusername = users.filter((user: any) => user.username === email);
      const checkpassword = users.filter((user: any) => user.password === password);
      if(checkemail.length === 0) {
        if(checkusername.length === 0) {
          alert('Email or password is incorrect');
          return;
        }
      }
      if(checkpassword.length === 0) {
        alert('Email or password is incorrect');
        return;
      }
      const getuser = users.find((user:any) => {
        if(user.email === email) {
          return user;
        }
        if(user.username === email) {
          return user;
        }
      });
      if(!getuser.activate) {
        alert('Your account has been deactivated by Admin');
        return;
      }
      if(getuser) {
        localStorage.setItem('loginuser', JSON.stringify(getuser));
      }
      if(getuser.username.toLowerCase() === 'admin') {
        this.router.navigate(['admin']);
      }
      else {
        this.router.navigate(['user']);
      }
    }
  }

}
