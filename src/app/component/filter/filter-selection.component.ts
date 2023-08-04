import {Component, inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterItem} from "../../model/filter-item";
import {isPlatformBrowser} from "@angular/common";
import {LabelType} from "@angular-slider/ngx-slider";
import {FiltersApiService} from "../../service/filters-api.service";
import {NavigationService} from "../../service/navigation.service";
import {AvailableFilterItem} from "../../model/available-filter-item";

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
  private platformId: Object = inject(PLATFORM_ID);
  private filtersService: FiltersApiService = inject(FiltersApiService);
  private navigationService: NavigationService = inject(NavigationService);
  private availableFilters: Array<AvailableFilterItem | null> = [];
  private selectedFilterIds: Array<string> = [];

  public maximumPrice: number = 30000;
  public minimumPrice: number = 0;
  public isLoading = false;

  public colorFilters: Array<FilterItem> = [
    new FilterItem('1000008', 'FILTERS_COLORS_BLUE'),
    new FilterItem('1000009', 'FILTERS_COLORS_BROWN'),
    new FilterItem('1000006', 'FILTERS_COLORS_DARKBLUE'),
    new FilterItem('1000007', 'FILTERS_COLORS_DARKRED'),
    new FilterItem('1000010', 'FILTERS_COLORS_YELLOW'),
    new FilterItem('1000011', 'FILTERS_COLORS_GOLD'),
    new FilterItem('1000005', 'FILTERS_COLORS_GRAY'),
    new FilterItem('1000012', 'FILTERS_COLORS_GREEN'),
    new FilterItem('1000112', 'orange'),
    new FilterItem('1000017', 'FILTERS_COLORS_PURPLE'),
    new FilterItem('1000013', 'FILTERS_COLORS_PINK'),
    new FilterItem('1000004', 'FILTERS_COLORS_RED'),
    new FilterItem('1000014', 'FILTERS_COLORS_BLACK'),
    new FilterItem('1000015', 'FILTERS_COLORS_SILVER'),
    new FilterItem('1000016', 'FILTERS_COLORS_WHITE')
  ];

  public brandsFilters: Array<FilterItem> = [
    new FilterItem('1000109', 'Activision'),
    new FilterItem('1000088', 'Adidas'),
    new FilterItem('1000087', 'Apple'),
    new FilterItem('1000098', 'Bruno Banani'),
    new FilterItem('1000101', 'Bugatti'),
    new FilterItem('1000103', 'Calvin Klein'),
    new FilterItem('1000110', 'Chanel'),
    new FilterItem('1000099', 'Desigual'),
    new FilterItem('1000107', 'Electronic Arts'),
    new FilterItem('1000105', 'Esprit'),
    new FilterItem('1000102', 'Fossil'),
    new FilterItem('1000100', 'Gabor'),
    new FilterItem('1000091', 'Google'),
    new FilterItem('1000096', 'Guess'),
    new FilterItem('1000106', 'Hudora'),
    new FilterItem('1000097', 'Lascara'),
    new FilterItem('1000093', 'LEGO'),
    new FilterItem('1000104', 'Nike'),
    new FilterItem('1000095', 'Nintendo'),
    new FilterItem('1000113', 'Nokia'),
    new FilterItem('1000090', 'Puma'),
    new FilterItem('1000089', 'Samsung'),
    new FilterItem('1000092', 'Sony'),
    new FilterItem('1000094', 'Vivanco'),
    new FilterItem('1000108', 'Vtech')
  ];

  public fitFilters: Array<FilterItem> = [
    new FilterItem('1000002', 'flare fit'),
    new FilterItem('1000003', 'skinny fit')
  ];

  public sustainabilityFilters: Array<FilterItem> = [
    new FilterItem('1000111', 'bio')
  ];

  public storageSizeFilters: Array<FilterItem> = [
    new FilterItem('1000081', '16 GB'),
    new FilterItem('1000082', '32 GB'),
    new FilterItem('1000083', '64 GB'),
    new FilterItem('1000084', '128 GB'),
    new FilterItem('1000085', '256 GB'),
    new FilterItem('1000086', '512 GB')
  ];

  public productTypeFilters: Array<FilterItem> = [
    new FilterItem('1000056', 'FILTERS_PRODUCTTYPES_HAIR_CARE'),
    new FilterItem('1000057', 'FILTERS_PRODUCTTYPES_HAIR_STYLING'),
    new FilterItem('1000055', 'FILTERS_PRODUCTTYPES_FRAGRANCES_WOMEN'),
    new FilterItem('1000061', 'FILTERS_PRODUCTTYPES_FACE_CARE'),
    new FilterItem('1000062', 'FILTERS_PRODUCTTYPES_SKIN_CARE_KIDS'),
    new FilterItem('1000054', 'FILTERS_PRODUCTTYPES_FRAGRANCES_MEN'),
    new FilterItem('1000059', 'FILTERS_PRODUCTTYPES_MAKEUP_EYES'),
    new FilterItem('1000060', 'FILTERS_PRODUCTTYPES_MAKEUP_LIPS'),
    new FilterItem('1000058', 'FILTERS_PRODUCTTYPES_PAINKILLERS'),
    new FilterItem('1000053', 'FILTERS_PRODUCTTYPES_SOAP'),
    new FilterItem('1000051', 'FILTERS_PRODUCTTYPES_TEA'),
    new FilterItem('1000064', 'FILTERS_PRODUCTTYPES_CABLES_AUDIOCABLES'),
    new FilterItem('1000065', 'FILTERS_PRODUCTTYPES_CABLES_DISPLAYCABLES'),
    new FilterItem('1000066', 'FILTERS_PRODUCTTYPES_CABLES_ELECTRICCABLES'),
    new FilterItem('1000067', 'FILTERS_PRODUCTTYPES_CABLES_NETWORKCABLES'),
    new FilterItem('1000068', 'FILTERS_PRODUCTTYPES_COMPUTERS_TABLETS'),
    new FilterItem('1000069', 'FILTERS_PRODUCTTYPES_FULLYAUTOMATICCOFFEEMACHINES'),
    new FilterItem('1000070', 'FILTERS_PRODUCTTYPES_HOMECINEMA'),
    new FilterItem('1000071', 'FILTERS_PRODUCTTYPES_INKJETPRINTER'),
    new FilterItem('1000072', 'FILTERS_PRODUCTTYPES_LASERPRINTER'),
    new FilterItem('1000073', 'FILTERS_PRODUCTTYPES_PRODUCTTYPES_HOME_TVS'),
    new FilterItem('1000074', 'FILTERS_PRODUCTTYPES_DISHWASHERS'),
    new FilterItem('1000075', 'FILTERS_PRODUCTTYPES_DRYERS'),
    new FilterItem('1000076', 'FILTERS_PRODUCTTYPES_FRIDGES_AND_FREEZERS'),
    new FilterItem('1000077', 'FILTERS_PRODUCTTYPES_OVENS'),
    new FilterItem('1000078', 'FILTERS_PRODUCTTYPES_WASHING_MACHINES'),
    new FilterItem('1000079', 'FILTERS_PRODUCTTYPES_SMARTPHONESCELLPHONES'),
    new FilterItem('1000080', 'FILTERS_PRODUCTTYPES_SMARTWATCHES')
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
    new FilterItem('1000063', 'Flaconi'),
    new FilterItem('1000026', 'Fussmattenwelt'),
    new FilterItem('1000027', 'Hayman Coffee'),
    new FilterItem('1000028', 'Hörner'),
    new FilterItem('1000029', 'Idee'),
    new FilterItem('1000030', 'Inhofer'),
    new FilterItem('1000031', 'IMWH'),
    new FilterItem('1000032', 'Jan Vanderstorm'),
    new FilterItem('1000052', 'Meßmer'),
    new FilterItem('1000033', 'Mytoys'),
    new FilterItem('1000034', 'Natural Food'),
    new FilterItem('1000114', 'Oh my fantasy'),
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

  public priceSliderOptions: any = {
    floor: 0,
    ceil: 30000,
    step: 5,
    translate: (value: number, label: LabelType): string => value + ' EUR'
  };

  ngOnInit(): void {
    const filterIds = this.route.snapshot?.queryParamMap?.get('filters') as string || '';
    this.selectedFilterIds = filterIds.split('-').filter(id => id);

    let val = this.route.snapshot?.queryParamMap?.get('p_min');
    this.minimumPrice = val ? Number.parseInt(val) : this.minimumPrice;

    val = this.route.snapshot?.queryParamMap?.get('p_max');
    this.maximumPrice = val ? Number.parseInt(val) : this.maximumPrice;
  }

  public ngAfterViewChecked() {
    if (this.isClientSide && this.dialog?.open && !this.availableFilters.length && !this.isLoading) {
      this.isLoading = true;
      this.filtersService.getAvailableFilters(
        this.navigationService.activeNavigationItem?.toId || '',
        this.route.snapshot?.queryParamMap?.get('search') || '',
        this.route.snapshot?.queryParamMap?.get('p_min') || '',
        this.route.snapshot?.queryParamMap?.get('p_max') || ''
      ).subscribe(filters => {
        this.availableFilters = filters;

        this.brandsFilters = this.brandsFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.colorFilters = this.colorFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.fitFilters = this.fitFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.productTypeFilters = this.productTypeFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.shopsFilters = this.shopsFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.storageSizeFilters = this.storageSizeFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.sustainabilityFilters = this.sustainabilityFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.isLoading = false;
      });
    }
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

    urlTree.queryParams['p_min'] = this.minimumPrice;
    urlTree.queryParams['p_max'] = this.maximumPrice;

    if (this.selectedFilterIds.length) {
      urlTree.queryParams['filters'] = this.selectedFilterIds.join('-');
    }
    else { delete urlTree.queryParams['filters']; }

    this.router.navigateByUrl(urlTree.toString()).then(() => {
      window.location.reload();
    });
  }

  get isClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
