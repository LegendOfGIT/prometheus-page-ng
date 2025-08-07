import { Component } from '@angular/core';
import {DiscountItem} from '../../model/discount-item';
import {Discounts} from '../../configurations/discounts';

@Component({
  selector: 'promotions-overview',
  templateUrl: './promotions-overview.component.html',
  styleUrls: ['./promotions-overview.component.scss']
})
export class PromotionsOverviewComponent {
  get ActivePromotions(): DiscountItem[] {
    return Discounts.DISCOUNTS.filter((discount: DiscountItem) => discount.isCurrentlyActive());
  }
}
