import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@webapp-svc/core/authentication.service';
import { UtilsService } from '@webapp-svc/core/utils.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, AfterViewInit {
  returnUrl: string;
  loadingLogin = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  validateMode = false;
  hidePassword = true;

  constructor(private router: Router,
    private utilsService: UtilsService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
  }
  ngAfterViewInit(): void {
  }
  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginForm.valid) this.validateMode = false;
      else this.validateMode = true;
    })
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    const appToken = this.authenticationService.appTokenValue;
    if (appToken && appToken.id) {
      this.router.navigate([this.returnUrl]);
    }
  }
  validate(controlName: string) {
    return this.loginForm.controls[controlName].hasError('required') && this.validateMode;
  }
  login() {
    this.validateMode = true;
    if (this.loginForm.valid) {
      this.loadingLogin = true;
      const loginForm = this.loginForm.value;

      this.authenticationService.login(loginForm.username, loginForm.password).subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        () => {
          this.utilsService.showNotification('top', 'right', 'Đăng nhập thất bại', 4);
        }
      );
    }
  }
  blurPassword(){
    document.getElementById('password').blur();
  }


}
