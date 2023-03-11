import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddToWishlistComponent } from './component/wishlist/add-to-wishlist.component';
import { ItemsComponent } from './component/overview/items.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { SearchProfilesComponent } from './component/profile/search/search-profiles.component';
import { SearchProfileSelectionComponent } from './component/profile/search/search-profile-selection.component';
import { ProfileComponent } from './component/profile/profile.component';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { TranslationPipe } from './pipes/translation.pipe';
import { StartPageComponent } from './component/landing-pages/start-page.component';
import { CategoryTeaserComponent } from './component/landing-pages/category-teaser.component';
import { SingleProductViewComponent } from './component/product-view/single-product-view.component';
import { UrlEncodePipe } from './pipes/web.pipe';
import { GeneralDataProtectionRegulationComponent } from './component/legal/general-data-protection-regulation.component';

@NgModule({
  declarations: [
    AppComponent,

    AddToWishlistComponent,
    CategoryTeaserComponent,
    GeneralDataProtectionRegulationComponent,
    HeaderComponent, FooterComponent,
    ImprintComponent,
    ItemsComponent,
    NavigationComponent,
    ProfileComponent,
    SearchProfilesComponent, SearchProfileSelectionComponent,
    SingleProductViewComponent,
    StartPageComponent,
    WishlistItemsComponent,

    TranslationPipe,
    UrlEncodePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '408077216324-u368r57tn13rdju7832l1nj7fs7c4mdf.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
