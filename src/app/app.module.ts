import {APP_ID, importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { StartPageComponent } from './component/landing-pages/start-page.component';
import { GeneralDataProtectionRegulationComponent } from './component/legal/general-data-protection-regulation.component';
import { DataProtectionComponent } from './component/legal/data-protection.component';
import { SharedComponentsModule } from './component/shared-components.module';
import { PipesModule } from './pipes/pipes.module';
import { NotFoundComponent } from './component/landing-pages/not-found.component';
import { WishlistsComponent } from './component/wishlist/wishlists.component';
import { WishlistItemComponent } from './component/wishlist/wishlist-item.component';
import {NgForOf, NgIf} from "@angular/common";
import {ModeratedTeaserComponent} from "./component/landing-pages/moderated-teaser.component";
import {LoadingComponent} from "./component/loading/loading.component";
import {MessagesComponent} from "./component/messages/messages.component";

@NgModule({
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WishlistsComponent,
    GeneralDataProtectionRegulationComponent,
    HeaderComponent, FooterComponent,
    NotFoundComponent,
    StartPageComponent,
    WishlistItemsComponent,
    WishlistItemComponent,
    ImprintComponent,
    DataProtectionComponent,

    SharedComponentsModule,
    PipesModule,
    NgForOf,
    NgIf,
    ModeratedTeaserComponent,
    LoadingComponent, MessagesComponent
  ],
    providers: [
      { provide: APP_ID,  useValue: 'serverApp' },
      provideHttpClient()
    ]
})
export class AppModule { }
