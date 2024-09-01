import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

import {Wishlist} from '../../model/wishlist';
import {WishlistItemsApiService} from '../../service/wishlist-items-api.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent implements OnDestroy {
  public wishlists: Wishlist[] = [];
  public form: FormGroup;
  public isLoading: boolean = true;
  private subs: Subscription[] = [];

  constructor(private wishlistService: WishlistItemsApiService,
              private formBuilder: FormBuilder) {
    this.subs.push(this.wishlistService.getWishlists().subscribe(
      {
        next: (wishlists: Wishlist[]): void => {
          this.wishlists = wishlists;
          this.isLoading = false;
        },
        error: (): void => {
          this.isLoading = false;
        }
      }));

    this.form = this.formBuilder.group({
      wishlistTitle: []
    })
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription): void => { sub.unsubscribe(); });
  }

  public createWishlist(): void {
    this.isLoading = true;
    this.subs.push(this.wishlistService.createWishlist(this.form.value.wishlistTitle ?? '')
      .subscribe({
        next: (): void => {
          this.form.patchValue({ wishlistTitle: '' });
          this.isLoading = false;
        },
        error: (): void => {
          this.isLoading = false;
        }
      }));
  }

  get Wishlists(): Wishlist[] {
    return this.wishlistService.wishlists;
  }
}
