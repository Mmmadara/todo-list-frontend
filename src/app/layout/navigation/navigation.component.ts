import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  isDataLoaded = false;
  user: any | undefined;

  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService,
    private router: Router,
    public authService: AuthService
  ) {
    this.isLoggedIn = !!this.tokenService.getToken();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe((data) => {
        this.user = data;
        this.isDataLoaded = true;
      });
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService._isLoggedIn$.next(false);
    this.isDataLoaded = false;
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  openPosts(statusId: number) {
    switch (statusId) {
      case 1:
        this.router.navigate(['/posts']);
        break;
      case 2:
        this.router.navigate(['/deleted-posts']);
        break;
    }
  }
}
