import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

interface Hobbies {
  name: string;
  checked: boolean;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public genders: string[] = ['Male', 'Female']
  public educations: string[] = ['Diploma', 'Graduation', 'Masters'];
  public hobbies: Array<Hobbies> = [
    { name: 'reading books', checked: false },
    { name: 'playing chess', checked: false },
    { name: 'watching movies', checked: false },
    { name: 'acting', checked: false },
    { name: 'teaching', checked: false },
    { name: 'cooking', checked: false },
    { name: 'dancing', checked: false },
    { name: 'traveling', checked: false },
    { name: 'video editing', checked: false },
    { name: 'meditation', checked: false }
  ];
  public registerForm!: FormGroup;
  public uploadfile: string | null | ArrayBuffer = null;
  public toppings!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.pattern(emailregex)]),
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'cnfmpassword': new FormControl(null, [Validators.required]),
      'profilepic': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, [Validators.required]),
      'education': new FormControl(null, [Validators.required]),
    });
    this.toppings = this._formBuilder.group({
      'reading books': false,
      'playing chess': false,
      'watching movies': false,
      'acting': false,
      'teaching': false,
      'cooking': false,
      'dancing': false,
      'traveling': false,
      'video editing': false,
      'meditation': false
    });
  }

  onAddFile(event: any): void {
    const file = new FileReader();
    file.addEventListener('load', () => {
      this.uploadfile = file.result;
    });
    file.readAsDataURL(event.target.files[0]);
  }

  onSubmit(): void {
    const lsuser: any = localStorage.getItem('dbusers');
    const { email, username, password } = this.registerForm.value;
    if(password.length < 6) {
      alert('Password must be atleast 6 character');
      return;
    }
    if (lsuser !== null) {
      let users = JSON.parse(lsuser);
      let checkmail = users.find((user: any) => user.email === email);
      let checkuser = users.find((user: any) => user.username === username);
      if(checkmail) {
        alert('Email already exists')
        return;
      }
      if(checkuser) {
        alert('Username already exists')
        return;
      }
    }
    let hobbies = [];
    if (!this.registerForm.valid) {
      alert('Form not contain valid data');
      return;
    }
    if (this.registerForm.value.password == !this.registerForm.value.cnfmpassword) {
      alert('Password is not match');
      return;
    }
    if (!this.uploadfile) {
      alert('Please upload file')
      return;
    }
    if(!this.registerForm.valid) {
      return;
    }
    for (let topping in this.toppings.value) {
      if (this.toppings.value[topping] === true) {
        hobbies.push(topping);
      }
    }
    const user: User = { ...this.registerForm.value };
    user.hobbies = hobbies;
    user.profilepic = this.uploadfile;
    user.activate = true;
    delete user['cnfmpassword'];
    if (lsuser === null) {
      let users = [user];
      localStorage.setItem('dbusers', JSON.stringify(users));
    }
    if (lsuser !== null) {
      let users = JSON.parse(lsuser);
      users = [...users, user];
      localStorage.setItem('dbusers', JSON.stringify(users));
    }
    alert('User register successfully');
    this.router.navigate(['login']);
  }

}
