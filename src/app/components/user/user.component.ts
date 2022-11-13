import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public loginuser: User | undefined;
  public password: string = '';
  public totalusers: number | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const lnuser = localStorage.getItem('loginuser');
    const dbusers = localStorage.getItem('dbusers');
    this.loginuser = JSON.parse(lnuser ? lnuser : '');
    const parseddbusers = JSON.parse(dbusers ? dbusers : '');
    const users = parseddbusers.filter((users: User) => users.username.toLowerCase() !== 'admin');
    this.totalusers = users.length;
  }

  onChangepwd(): void {
    if(this.password?.length > 6) {
      const changepwd = confirm('Are you sure do you really want to change password');
      if(changepwd) {
          const lnuser = localStorage.getItem('loginuser');
          const parsedlnuser = JSON.parse(lnuser ? lnuser : '');
          const dbuser = localStorage.getItem('dbusers');
          const parsedbuser = JSON.parse(dbuser ? dbuser : '');
          const parseddbuserIndex = parsedbuser.findIndex((users: User) => users.email === parsedlnuser.email);
          if(parseddbuserIndex !== -1) {
            if(!parsedbuser[parseddbuserIndex].activate) {
              alert('Your account has been deactivated by Admin, and you cannot reset the password');
              return;
            }
            parsedbuser[parseddbuserIndex].password = this.password;
            localStorage.setItem('dbusers', JSON.stringify(parsedbuser));
          }
          alert('Please changed successfully, Please login to continue');
          this.router.navigate(['login']);
      }
    }
    else {
      alert('Password must be atleast 6 character');
    }
  }

  onSignout(): void {
    localStorage.removeItem('loginuser');
    this.router.navigate(['login']);
  }

}
