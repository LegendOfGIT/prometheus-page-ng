import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module, NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss']
})
export class SingleProductViewComponent {

  public itemId: string = '';

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {

    route.paramMap.subscribe((params) => {
      this.navigationService.activeModule = Module.SINGLE_PRODUCT_VIEW;
      this.itemId = params.get('itemId') || '';
    });

  }

}
