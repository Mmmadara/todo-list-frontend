import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  user: any | undefined;

  constructor(private tokenService: TokenStorageService) {}

  ngOnInit(): void {
    // console.log(this.tokenService.getToken());
    
  }
}
