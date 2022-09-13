import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddToWishlistComponent } from './component/wishlist/add-to-wishlist.component';
import { ItemsComponent } from './component/overview/items.component';
import { HeaderSearchComponent } from './component/header/search/header-search.component';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';

@NgModule({
  declarations: [
    AppComponent,

    AddToWishlistComponent,
    HeaderSearchComponent,
    ItemsComponent,
    WishlistItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
