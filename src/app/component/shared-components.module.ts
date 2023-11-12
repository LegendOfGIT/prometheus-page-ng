import { NgModule } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { AddToWishlistComponent } from './wishlist/add-to-wishlist.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CategoryTeaserComponent } from './landing-pages/category-teaser.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AddToWishlistComponent,
    BreadcrumbsComponent,
    CategoryTeaserComponent,
    ItemComponent,
    LoadingComponent
  ],
  exports: [
    AddToWishlistComponent,
    BreadcrumbsComponent,
    CategoryTeaserComponent,
    ItemComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class SharedComponentsModule { }
