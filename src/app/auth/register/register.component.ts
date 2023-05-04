import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public hide = true;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    console.log(this.registerForm.value);

    this.authService
      .register({
        email: this.registerForm.value.email,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password,
      })
      .subscribe(
        (data) => {
          console.log(data);

          this.notificationService.showSnackBar('Successfully registered!');

          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);

          this.notificationService.showSnackBar(error);
        }
      );
  }
}
