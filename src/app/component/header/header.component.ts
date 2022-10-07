import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isSearchFieldActive: boolean = false;
  public searchPatternControl: FormControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.activatePageReloadOnEveryRouteNavigation();
    this.subscribeSearchPatternChanges();
  }

  private activatePageReloadOnEveryRouteNavigation() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  private subscribeSearchPatternChanges(): void {
    this.searchPatternControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.router.navigate([''], { queryParams: { search: this.searchPatternControl.value } });
      });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

}
