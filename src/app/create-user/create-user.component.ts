import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  user: User = {} as User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onFormSubmit(): void {
    if (this.user.name && this.user.phone && this.user.email) {
      this.userService.saveUser(this.user).subscribe(
        (res: User) => {
          alert('User saved successfully');
          this.user = {} as User;
        },
        (err) => console.log
      );
    }
  }
}
