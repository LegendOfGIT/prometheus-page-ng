import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/model/item';
import { ItemsApiService } from 'src/app/service/items-api.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    private destroyedService$ = new Subject();
    public items: Array<Item | null> = [];

    constructor(
      private route: ActivatedRoute,
      private itemsService: ItemsApiService,
      private navigationService: NavigationService
    ) {

      route.paramMap.subscribe((params) => {
        this.navigationService.setActiveNavigationLevelIds([
          params.get('navigationIdLevelA') || '',
          params.get('navigationIdLevelB') || '',
          params.get('navigationIdLevelC') || ''
        ]);
      });

    }

    ngOnInit(): void {

        this.itemsService.getItems(this.route.snapshot?.queryParamMap?.get('search') as string)
            .pipe(takeUntil(this.destroyedService$))
            .subscribe(
                items => {
                  this.items = items;
                });


    }


}
