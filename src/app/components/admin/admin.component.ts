import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<User>;
  public displayedColumns: string[] = ['sino', 'name', 'emailid', 'username', 'activation'];
  public dataSource!: User[];
  private dbusers = localStorage.getItem('dbusers');
  public editmode = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const lnuser = localStorage.getItem('loginuser');
    if(lnuser !== null) {
      const user = JSON.parse(lnuser ? lnuser : '');
      if(user.username.toLowerCase() !== 'admin') {
        this.router.navigate(['login']);
      }
    }
    if (this.dbusers !== null) {
      this.dataSource = JSON.parse(this.dbusers ? this.dbusers : '');
    }
  }

  onEdit(): void {
    this.editmode = true;
  }

  onActivate(user: User): void {
    if(this.editmode) {
      const dbusers = JSON.parse(this.dbusers ? this.dbusers : '');
      const dbuserIndex = dbusers.findIndex((dbuser: User) => dbuser.username === user.username);
      const dsuserIndex = this.dataSource.findIndex((dsuser: User) => dsuser.username === user.username);
      if(dsuserIndex !== -1) {
        this.dataSource[dsuserIndex].activate = true;
        this.table.renderRows();
      }
      if(dbuserIndex !== -1) {
        dbusers[dbuserIndex].activate = true;
        localStorage.setItem('dbusers', JSON.stringify(dbusers));
      }
    }
  }

  onDeactivate(user: User): void {
    if(this.editmode) {
      const dbusers = JSON.parse(this.dbusers ? this.dbusers : '');
      const dbuserIndex = dbusers.findIndex((dbuser: User) => dbuser.username === user.username);
      const dsuserIndex = this.dataSource.findIndex((dsuser: User) => dsuser.username === user.username);
      if(dsuserIndex !== -1) {
        this.dataSource[dsuserIndex].activate = false;
        this.table.renderRows();
      }
      if(dbuserIndex !== -1) {
        dbusers[dbuserIndex].activate = false;
        localStorage.setItem('dbusers', JSON.stringify(dbusers));
      }
    }
  }

  onDelete(user: User): void {
    if(this.editmode) {
      let deleteuser = confirm("Do you really want to delete this user");
      if(deleteuser) {
        let dbusers = JSON.parse(this.dbusers ? this.dbusers : '');
        const dbuserIndex = dbusers.findIndex((dbuser: User) => dbuser.username === user.username);
        const dsuserIndex = this.dataSource.findIndex((dsuser: User) => dsuser.username === user.username);
        if(dsuserIndex !== -1) {
          delete this.dataSource[dsuserIndex];
          this.dataSource = this.dataSource.filter(Boolean);
          this.table.renderRows();
        }
        if(dbuserIndex !== -1) {
          delete dbusers[dbuserIndex];
          dbusers = dbusers.filter(Boolean);
          localStorage.setItem('dbusers', JSON.stringify(dbusers));
        }
      }
    }
  }
}
