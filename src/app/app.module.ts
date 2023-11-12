import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { GeneralDataProtectionRegulationComponent } from './component/legal/general-data-protection-regulation.component';
import { DataProtectionComponent } from './component/legal/data-protection.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PipesModule } from './pipes/pipes.module';
import { SharedComponentsModule } from './component/shared-components.module';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';

@NgModule({
  declarations: [
    AppComponent,

    GeneralDataProtectionRegulationComponent,
    HeaderComponent, FooterComponent,
    DataProtectionComponent,
    ImprintComponent,
    ProfileComponent,
    WishlistItemsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSliderModule,
    PipesModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
