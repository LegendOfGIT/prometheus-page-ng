import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterItem} from "../../model/filter-item";

@Component({
  selector: 'app-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.scss']
})
export class FilterSelectionComponent implements OnInit {
  @Input()
  dialog: HTMLDialogElement | undefined = undefined;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private selectedFilterIds: Array<string> = [];

  public colorFilters: Array<FilterItem> = [
    new FilterItem('1000008', 'FILTERS_COLORS_BLUE'),
    new FilterItem('1000009', 'FILTERS_COLORS_BROWN'),
    new FilterItem('1000006', 'FILTERS_COLORS_DARKBLUE'),
    new FilterItem('1000007', 'FILTERS_COLORS_DARKRED'),
    new FilterItem('1000010', 'FILTERS_COLORS_YELLOW'),
    new FilterItem('1000011', 'FILTERS_COLORS_GOLD'),
    new FilterItem('1000005', 'FILTERS_COLORS_GRAY'),
    new FilterItem('1000012', 'FILTERS_COLORS_GREEN'),
    new FilterItem('1000017', 'FILTERS_COLORS_PURPLE'),
    new FilterItem('1000013', 'FILTERS_COLORS_PINK'),
    new FilterItem('1000004', 'FILTERS_COLORS_RED'),
    new FilterItem('1000014', 'FILTERS_COLORS_BLACK'),
    new FilterItem('1000015', 'FILTERS_COLORS_SILVER'),
    new FilterItem('1000016', 'FILTERS_COLORS_WHITE')
  ];

  public fitFilters: Array<FilterItem> = [
    new FilterItem('1000002', 'flare fit'),
    new FilterItem('1000003', 'skinny fit')
  ];

  public shopsFilters: Array<FilterItem> = [
    new FilterItem('1000000', 'dressforless'),
    new FilterItem('1000001', 'BigGreen Smile'),
    new FilterItem('1000018', '100% pure'),
    new FilterItem('1000019', 'Amazon'),
    new FilterItem('1000020', 'Backmarket'),
    new FilterItem('1000021', 'Bearfamily records'),
    new FilterItem('1000022', 'Black is beautiful'),
    new FilterItem('1000023', 'Buch24'),
    new FilterItem('1000024', 'Ebrosia'),
    new FilterItem('1000025', 'Enners'),
    new FilterItem('1000026', 'Fussmattenwelt'),
    new FilterItem('1000027', 'Hayman Coffee'),
    new FilterItem('1000028', 'Hörner'),
    new FilterItem('1000029', 'Idee'),
    new FilterItem('1000030', 'Inhofer'),
    new FilterItem('1000031', 'IMWH'),
    new FilterItem('1000032', 'Jan Vanderstorm'),
    new FilterItem('1000033', 'Mytoys'),
    new FilterItem('1000034', 'Natural Food'),
    new FilterItem('1000035', 'Otto'),
    new FilterItem('1000036', 'Pakama'),
    new FilterItem('1000037', 'PlantLife'),
    new FilterItem('1000038', 'Quelle'),
    new FilterItem('1000039', 'Reifen.de'),
    new FilterItem('1000040', 'Sandawha Skincare'),
    new FilterItem('1000041', 'Shop24 direct'),
    new FilterItem('1000042', 'Shop-Apotheke'),
    new FilterItem('1000043', 'Songmics'),
    new FilterItem('1000044', 'Studibuch'),
    new FilterItem('1000045', 'Third of Life'),
    new FilterItem('1000046', 'Timber Taste'),
    new FilterItem('1000047', 'Toom'),
    new FilterItem('1000048', 'Top Parfümerie'),
    new FilterItem('1000049', 'Waschbär'),
    new FilterItem('1000050', 'White Collection')
  ];

  ngOnInit(): void {
    const filterIds = this.route.snapshot?.queryParamMap?.get('filters') as string || '';
    this.selectedFilterIds = filterIds.split('-').filter(id => id);
  }

  public isFilterSelected(filterId: string): boolean {
    return -1 !== this.selectedFilterIds.indexOf(filterId);
  }

  public toggleFilter(filterId: string): void {
    if (!this.isFilterSelected(filterId)) {
      this.selectedFilterIds.push(filterId);
      return;
    }

    this.selectedFilterIds = this.selectedFilterIds.filter(id => filterId !== id);
  }

  public applyFilters(): void {
    let urlTree = this.router.parseUrl(this.router.url);

    if (this.selectedFilterIds.length) {
      urlTree.queryParams['filters'] = this.selectedFilterIds.join('-');
    }
    else {
      delete urlTree.queryParams['filters'];
    }

    this.router.navigateByUrl(urlTree.toString()).then(() => {
      window.location.reload();
    });
  }
}
