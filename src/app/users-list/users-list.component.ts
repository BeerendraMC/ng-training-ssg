import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users!: User[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setUsers();
  }

  setUsers(): void {
    this.userService.getUsers().subscribe(
      (res: User[]) => {
        this.users = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
