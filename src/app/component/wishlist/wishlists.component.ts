import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {Wishlist} from '../../model/wishlist';
import {WishlistItemsApiService} from '../../service/wishlist-items-api.service';
import {MessagesService} from "../../service/messages.service";
import {TranslationService} from "../../service/translation.service";
import {MessageType} from "../../model/message";
import {Module} from "../../service/navigation.service";
import {TranslationPipe} from "../../pipes/translation.pipe";
import {RouterLink} from "@angular/router";
import {SharedComponentsModule} from "../shared-components.module";
import {LoadingComponent} from "../loading/loading.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss'],
  standalone: true,
  imports: [TranslationPipe, RouterLink, ReactiveFormsModule, SharedComponentsModule, LoadingComponent, NgIf, NgForOf]
})
export class WishlistsComponent implements OnDestroy {
  public wishlists: Wishlist[] = [];
  public form: FormGroup;
  public isLoading: boolean = true;
  private subs: Subscription[] = [];

  constructor(private wishlistService: WishlistItemsApiService,
              private messageService: MessagesService,
              private translationService: TranslationService,
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
          this.messageService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: this.translationService.getTranslations()['MESSAGE_WISHLIST_CAN_NOT_CREATE_WISHLIST'] ?? '',
            type: MessageType.ERROR
          }
        }
      }));
  }

  get Wishlists(): Wishlist[] {
    return this.wishlistService.wishlists;
  }

  protected readonly Module = Module;
}
