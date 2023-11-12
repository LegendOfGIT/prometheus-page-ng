import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StartPageComponent } from './start-page.component';
import { StartPageRoutingModule } from './start-page-routing.module';
import { ModeratedTeaserComponent } from './moderated-teaser.component';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedComponentsModule } from '../shared-components.module';

@NgModule({
  declarations: [
    ModeratedTeaserComponent,
    StartPageComponent
  ],
  imports: [
    PipesModule,
    SharedComponentsModule,
    StartPageRoutingModule,
    HttpClientModule
  ]
})
export class StartPageModule { }
