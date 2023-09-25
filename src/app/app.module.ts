import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddToWishlistComponent } from './component/wishlist/add-to-wishlist.component';
import { ItemComponent } from './component/item/item.component';
import { ItemsComponent } from './component/overview/items.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProfileComponent } from './component/profile/profile.component';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { TranslationPipe } from './pipes/translation.pipe';
import { StartPageComponent } from './component/landing-pages/start-page.component';
import { CategoryTeaserComponent } from './component/landing-pages/category-teaser.component';
import { ModeratedTeaserComponent } from './component/landing-pages/moderated-teaser.component';
import { SingleProductViewComponent } from './component/product-view/single-product-view.component';
import { UrlEncodePipe } from './pipes/web.pipe';
import { GeneralDataProtectionRegulationComponent } from './component/legal/general-data-protection-regulation.component';
import { DataProtectionComponent } from './component/legal/data-protection.component';
import { FilterSelectionComponent } from './component/filter/filter-selection.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LoadingComponent } from './component/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,

    AddToWishlistComponent,
    CategoryTeaserComponent,
    ModeratedTeaserComponent,
    GeneralDataProtectionRegulationComponent,
    HeaderComponent, FooterComponent,
    DataProtectionComponent,
    FilterSelectionComponent,
    ImprintComponent,
    ItemComponent,
    ItemsComponent,
    LoadingComponent,
    ProfileComponent,
    SingleProductViewComponent,
    StartPageComponent,
    WishlistItemsComponent,

    TranslationPipe,
    UrlEncodePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSliderModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
