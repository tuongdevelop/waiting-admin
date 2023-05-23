import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../core/services';
import { first } from 'rxjs/operators';
// import { from } from 'rxjs';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  returnUrl: string;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  checkLogin() {
    this.loading = true;
    this.error = '';
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          if (error.status === 400) {
            this.error = 'Uncorrect username or password';
          } else if (error.status === 0) {
            this.error = 'Can\'t connect to server!';
          } else {
            this.error = this.authenticationService.error(error);
          }
        });
  }

}
