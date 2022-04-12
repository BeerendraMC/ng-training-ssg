import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  user: User = {} as User;
  isEdit = false;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.isEdit = true;
        this.getUser(+userId);
      } else {
        this.isEdit = false;
      }
    });
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe(
      (user: User) => {
        this.user = user;
      },
      (err) => console.log
    );
  }

  onFormSubmit(): void {
    if (this.user.name && this.user.phone && this.user.email) {
      if (this.isEdit) this.updateUser();
      else this.saveUser();
    }
  }

  saveUser(): void {
    this.userService.saveUser(this.user).subscribe(
      (res: User) => {
        alert('User saved successfully');
        this.user = {} as User;
      },
      (err) => console.log
    );
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (res: User) => {
        alert('User updated successfully!');
        this.router.navigateByUrl('users-list');
      },
      (err) => console.log
    );
  }
}
