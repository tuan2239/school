import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@webapp-svc/core/authentication.service';
import { UtilsService } from '@webapp-svc/core/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  public hidePassword: boolean = true;
  public loading: boolean = false;
  public validateMode: boolean = false;
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl(''),
    phone: new FormControl('')
  });

  constructor(private router: Router,
    private utilsService: UtilsService,
    private authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(() => {
      if (this.registerForm.valid) this.validateMode = false;
      else this.validateMode = true;
    })
  }

  public register(): void{
    this.validateMode = true;
    if (this.registerForm.valid) {
      this.loading = true;

      this.authenticationService.register(this.registerForm.value).subscribe(
        data => {
            this.router.navigate(['/']);
            this.loading = false;
        },
        () => {
          this.utilsService.showNotification('top', 'right', 'Đăng ký thất bại', 4);
            this.loading = false;
        }
      );
    }
  }

  public validate(controlName: string): boolean {
    return this.registerForm.controls[controlName].hasError('required') && this.validateMode;
  }

  public blurPassword(): void{
    document.getElementById('password').blur();
  }
}
