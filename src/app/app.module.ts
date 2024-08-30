import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
    declarations: [
        AppComponent,

        GeneralDataProtectionRegulationComponent,
        HeaderComponent, FooterComponent,
        DataProtectionComponent,
        ImprintComponent,
        NotFoundComponent,
        StartPageComponent,
        WishlistItemsComponent,
        WishlistsComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        SharedComponentsModule,
        PipesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
