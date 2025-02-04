import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

import { ItemComponent } from './item/item.component';
import { PipesModule } from '../pipes/pipes.module';
import { AddToWishlistComponent } from './wishlist/add-to-wishlist.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CategoryTeaserComponent } from './landing-pages/category-teaser.component';
import { LoadingComponent } from './loading/loading.component';
import { ModeratedTeaserComponent } from './landing-pages/moderated-teaser.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AddToWishlistComponent,
    BreadcrumbsComponent,
    CategoryTeaserComponent,
    ModeratedTeaserComponent,
    ItemComponent,
    LoadingComponent,
    MessagesComponent
  ],
  exports: [
    AddToWishlistComponent,
    BreadcrumbsComponent,
    CategoryTeaserComponent,
    ModeratedTeaserComponent,
    ItemComponent,
    LoadingComponent,
    MessagesComponent
  ],
    imports: [
        CommonModule,

        PipesModule,
        RouterLink
    ]
})
export class SharedComponentsModule { }
