import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/userService/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  constructor(

    private userService: UserService
    
  ) { }

  users: any[] = [];
  ordersLoaded = false;

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers() {

    this.userService.getAllUser().subscribe(

      (response) => {

        this.users = response;
        this.ordersLoaded = true;
        console.log(response);

      },
      (error) => {
        console.log(error);
      }
    )
  }

  removeUser(userID: number) {

    this.userService.deleteUserById(userID).subscribe(

      (response) => {

        this.users = this.users.filter(u => u.id !== userID);
        console.log("Succesfully remove user");
        
      },
      (error) => {
        console.log("Error remove user !!!");
      }
    )
  }






}
