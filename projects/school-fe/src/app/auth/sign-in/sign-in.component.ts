import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@webapp-svc/core/authentication.service';
import { UtilsService } from '@webapp-svc/core/utils.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  returnUrl: string;
  loadingLogin = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  validateMode = false;
  hidePassword = true;

  constructor(private router: Router,
    private utilsService: UtilsService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
  }
  public ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginForm.valid) this.validateMode = false;
      else this.validateMode = true;
    })
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  public validate(controlName: string): boolean {
    return this.loginForm.controls[controlName].hasError('required') && this.validateMode;
  }
  public login(): void {
    this.validateMode = true;
    if (this.loginForm.valid) {
      this.loadingLogin = true;

      this.authenticationService.login(this.loginForm.value).subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
            this.loadingLogin = false;
        },
        () => {
          this.utilsService.showNotification('top', 'right', 'Đăng nhập thất bại', 4);
            this.loadingLogin = false;
        }
      );
    }
  }
  public blurPassword(): void{
    document.getElementById('password').blur();
  }


}
