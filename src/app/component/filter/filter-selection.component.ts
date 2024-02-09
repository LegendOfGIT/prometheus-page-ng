import {AfterViewChecked, Component, inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import {FilterItem} from '../../model/filter-item';
import {isPlatformBrowser} from '@angular/common';
import {LabelType} from '@angular-slider/ngx-slider';
import {FiltersApiService} from '../../service/filters-api.service';
import {NavigationService} from '../../service/navigation.service';
import {AvailableFilterItem} from '../../model/available-filter-item';
import {Filters} from "../../configurations/filters";

@Component({
  selector: 'app-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.scss']
})
export class FilterSelectionComponent implements OnInit, AfterViewChecked {
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

  public brandsFilters: Array<FilterItem> = Filters.FILTERS.brands;

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

  public countriesOfOriginFilters: Array<FilterItem> = [
    new FilterItem('1000252', 'FILTERS_COO_AFRICA'),
    new FilterItem('1000237', 'FILTERS_COO_ARGENTINA'),
    new FilterItem('1000239', 'FILTERS_COO_AUSTRALIA'),
    new FilterItem('1000230', 'FILTERS_COO_BRAZIL'),
    new FilterItem('1000231', 'FILTERS_COO_CHINA'),
    new FilterItem('1000249', 'FILTERS_COO_DENMARK'),
    new FilterItem('1000235', 'FILTERS_COO_GERMANY'),
    new FilterItem('1000228', 'FILTERS_COO_FRANCE'),
    new FilterItem('1000227', 'FILTERS_COO_GREECE'),
    new FilterItem('1000232', 'FILTERS_COO_INDIA'),
    new FilterItem('1000229', 'FILTERS_COO_IRELAND'),
    new FilterItem('1000247', 'FILTERS_COO_ISRAEL'),
    new FilterItem('1000244', 'FILTERS_COO_ITALY'),
    new FilterItem('1000234', 'FILTERS_COO_JAPAN'),
    new FilterItem('1000251', 'FILTERS_COO_CANADA'),
    new FilterItem('1000243', 'FILTERS_COO_KOREA'),
    new FilterItem('1000245', 'FILTERS_COO_MEXICO'),
    new FilterItem('1000250', 'FILTERS_COO_NETHERLANDS'),
    new FilterItem('1000246', 'FILTERS_COO_AUSTRIA'),
    new FilterItem('1000233', 'FILTERS_COO_PORTUGAL'),
    new FilterItem('1000248', 'FILTERS_COO_SCOTLAND'),
    new FilterItem('1000242', 'FILTERS_COO_SWEDEN'),
    new FilterItem('1000238', 'FILTERS_COO_SPAIN'),
    new FilterItem('1000241', 'FILTERS_COO_HUNGARY'),
    new FilterItem('1000253', 'FILTERS_COO_USA'),
    new FilterItem('1000240', 'FILTERS_COO_VENEZUELA'),
    new FilterItem('1000236', 'FILTERS_COO_UNITEDKINGDOM')
  ];

  public tasteTypeFilters: Array<FilterItem> = [
    new FilterItem('1000223', 'FILTERS_TASTETYPES_FLOWERY'),
    new FilterItem('1000222', 'FILTERS_TASTETYPES_FRESH'),
    new FilterItem('1000224', 'FILTERS_TASTETYPES_FRUITY'),
    new FilterItem('1000225', 'FILTERS_TASTETYPES_STRONG'),
    new FilterItem('1000221', 'FILTERS_TASTETYPES_SWEET'),
    new FilterItem('1000220', 'FILTERS_TASTETYPES_DRY'),
    new FilterItem('1000226', 'FILTERS_TASTETYPES_SPICY'),
  ];

  public sizesFilter: Array<FilterItem> = [
    new FilterItem('1000134', 'XXS'),
    new FilterItem('1000135', 'XS'),
    new FilterItem('1000136', 'S'),
    new FilterItem('1000137', 'M'),
    new FilterItem('1000138', 'L'),
    new FilterItem('1000139', 'XL'),
    new FilterItem('1000140', 'XXL'),
    new FilterItem('1000141', 'XXXL'),
    new FilterItem('1000123', '25'),
    new FilterItem('1000124', '26'),
    new FilterItem('1000125', '27'),
    new FilterItem('1000126', '28'),
    new FilterItem('1000127', '29'),
    new FilterItem('1000128', '30'),
    new FilterItem('1000129', '31'),
    new FilterItem('1000130', '32'),
    new FilterItem('1000131', '33'),
    new FilterItem('1000132', '34'),
    new FilterItem('1000133', '35'),
  ];

  public ageFilter: Array<FilterItem> = [
    new FilterItem('1000147', 'FILTERS_AGE_FROM_6_MONTHS'),
    new FilterItem('1000148', 'FILTERS_AGE_FROM_12_MONTHS'),
    new FilterItem('1000149', 'FILTERS_AGE_FROM_18_MONTHS'),
    new FilterItem('1000150', 'FILTERS_AGE_FROM_24_MONTHS'),
    new FilterItem('1000151', 'FILTERS_AGE_FROM_30_MONTHS'),
    new FilterItem('1000152', 'FILTERS_AGE_FROM_36_MONTHS'),
    new FilterItem('1000153', 'FILTERS_AGE_FROM_42_MONTHS'),
    new FilterItem('1000154', 'FILTERS_AGE_FROM_48_MONTHS'),
    new FilterItem('1000155', 'FILTERS_AGE_FROM_1_YEAR'),
    new FilterItem('1000156', 'FILTERS_AGE_FROM_2_YEARS'),
    new FilterItem('1000157', 'FILTERS_AGE_FROM_3_YEARS'),
    new FilterItem('1000158', 'FILTERS_AGE_FROM_4_YEARS'),
    new FilterItem('1000159', 'FILTERS_AGE_FROM_6_YEARS'),
    new FilterItem('1000160', 'FILTERS_AGE_FROM_8_YEARS'),
    new FilterItem('1000161', 'FILTERS_AGE_FROM_12_YEARS'),
    new FilterItem('1000162', 'FILTERS_AGE_FROM_16_YEARS'),
    new FilterItem('1000163', 'FILTERS_AGE_FROM_18_YEARS')
  ];

  public fitFilters: Array<FilterItem> = [
    new FilterItem('1000002', 'flare fit'),
    new FilterItem('1000003', 'skinny fit')
  ];

  public genreFilters: Array<FilterItem> = [
    new FilterItem('1000192', 'FILTERS_GENRE_PARTY'),
    new FilterItem('1000193', 'FILTERS_GENRE_ROLEPLAY'),
    new FilterItem('1000194', 'FILTERS_GENRE_ACTION'),
    new FilterItem('1000195', 'FILTERS_GENRE_SPORT'),
    new FilterItem('1000196', 'FILTERS_GENRE_RACING'),
    new FilterItem('1000197', 'FILTERS_GENRE_SIMULATION'),
    new FilterItem('1000198', 'FILTERS_GENRE_ARCADE'),
    new FilterItem('1000199', 'FILTERS_GENRE_ADVENTURE'),
    new FilterItem('1000200', 'FILTERS_GENRE_PUZZLE'),
    new FilterItem('1000201', 'FILTERS_GENRE_HORROR'),
    new FilterItem('1000202', 'FILTERS_GENRE_SURVIVAL'),
    new FilterItem('1000203', 'FILTERS_GENRE_STRATEGY'),
    new FilterItem('1000204', 'FILTERS_GENRE_FLIGHT'),
    new FilterItem('1000205', 'FILTERS_GENRE_SHOOTER')
  ];

  public sustainabilityFilters: Array<FilterItem> = [
    new FilterItem('1000111', 'bio'),
    new FilterItem('1000178', 'FILTERS_SUSTAINABILITY_SUSTAINABLE'),
    new FilterItem('1000191', 'vegan'),
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
    new FilterItem('1000080', 'FILTERS_PRODUCTTYPES_SMARTWATCHES'),
    new FilterItem('1000209', 'FILTERS_PRODUCTTYPES_COFFEE'),
    new FilterItem('1000210', 'FILTERS_PRODUCTTYPES_COFFEEACCESSORIES'),
    new FilterItem('1000254', 'NAVIGATION_BEAUTY_CARE_EROTIC_MASSAGES'),
    new FilterItem('1000255', 'NAVIGATION_ELECTRONICS_AND_COMPUTERS_EROTIC_VIBRATORS'),
    new FilterItem('1000256', 'FILTERS_PRODUCTTYPES_EROTICUNDERWEAR'),
  ];

  public shopsFilters: Array<FilterItem> = [
    new FilterItem('1000018', '100% pure'),
    new FilterItem('1000177', '60 Beans'),
    new FilterItem('1000019', 'Amazon'),
    new FilterItem('1000176', 'AMD Möbel'),
    new FilterItem('1000144', 'Artgerecht'),
    new FilterItem('1000182', 'Asian Foodlovers'),
    new FilterItem('1000001', 'BigGreen Smile'),
    new FilterItem('1000020', 'Backmarket'),
    new FilterItem('1000021', 'Bearfamily records'),
    new FilterItem('1000186', 'Beautywelt'),
    new FilterItem('1000022', 'Black is beautiful'),
    new FilterItem('1000175', 'Bruno Banani'),
    new FilterItem('1000023', 'Buch24'),
    new FilterItem('1000181', 'Carrera Toys'),
    new FilterItem('1000184', 'Club of Wine'),
    new FilterItem('1000000', 'Dressforless'),
    new FilterItem('1000119', 'Dunleath'),
    new FilterItem('1000024', 'Ebrosia'),
    new FilterItem('1000208', 'Edelstahl Türklingel'),
    new FilterItem('1000025', 'Enners'),
    new FilterItem('1000063', 'Flaconi'),
    new FilterItem('1000033', 'Foot Store'),
    new FilterItem('1000026', 'Fussmattenwelt'),
    new FilterItem('1000143', 'Galapel'),
    new FilterItem('1000146', 'Gewürzland'),
    new FilterItem('1000258', 'Hairburst'),
    new FilterItem('1000027', 'Hayman Coffee'),
    new FilterItem('1000028', 'Hörner'),
    new FilterItem('1000029', 'Idee'),
    new FilterItem('1000030', 'Inhofer'),
    new FilterItem('1000257', 'iScooter'),
    new FilterItem('1000031', 'IMWH'),
    new FilterItem('1000032', 'Jan Vanderstorm'),
    new FilterItem('1000187', 'Karl Karlo'),
    new FilterItem('1000180', 'Laco'),
    new FilterItem('1000122', 'Medimops'),
    new FilterItem('1000052', 'Meßmer'),
    new FilterItem('1000185', 'Metabrew Society'),
    new FilterItem('1000034', 'Natural Food'),
    new FilterItem('1000121', 'Natures Way'),
    new FilterItem('1000114', 'Oh my fantasy'),
    new FilterItem('1000035', 'Otto'),
    new FilterItem('1000036', 'Pakama'),
    new FilterItem('1000037', 'PlantLife'),
    new FilterItem('1000038', 'Quelle'),
    new FilterItem('1000039', 'Reifen.de'),
    new FilterItem('1000040', 'Sandawha Skincare'),
    new FilterItem('1000120', 'Saunaloft'),
    new FilterItem('1000188', 'Señor López'),
    new FilterItem('1000041', 'Shop24 direct'),
    new FilterItem('1000042', 'Shop-Apotheke'),
    new FilterItem('1000190', 'Skeisan'),
    new FilterItem('1000183', 'Silkes Weinkeller'),
    new FilterItem('1000043', 'Songmics'),
    new FilterItem('1000044', 'Studibuch'),
    new FilterItem('1000045', 'Third of Life'),
    new FilterItem('1000046', 'Timber Taste'),
    new FilterItem('1000047', 'Toom'),
    new FilterItem('1000048', 'Top Parfümerie'),
    new FilterItem('1000117', 'Vertical Extreme'),
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
    let filterIds: string = (this.navigationService.activeNavigationItem?.filters || []).join('-');
    filterIds = filterIds || this.route.snapshot?.queryParamMap?.get('filters') as string || '';
    this.selectedFilterIds = filterIds.split('-').filter(id => id);

    let val: string | null = this.route.snapshot?.queryParamMap?.get('p_min');
    this.minimumPrice = val ? Number.parseInt(val) : this.minimumPrice;

    val = this.route.snapshot?.queryParamMap?.get('p_max');
    this.maximumPrice = val ? Number.parseInt(val) : this.maximumPrice;
  }

  public ngAfterViewChecked(): void {
    if (this.isClientSide && this.dialog?.open && !this.availableFilters.length && !this.isLoading) {
      this.isLoading = true;
      this.filtersService.getAvailableFilters(
        this.navigationService.activeNavigationItem?.toId || '',
        this.route.snapshot?.queryParamMap?.get('search') || '',
        this.route.snapshot?.queryParamMap?.get('p_min') || '',
        this.route.snapshot?.queryParamMap?.get('p_max') || ''
      ).subscribe((filters: Array<AvailableFilterItem | null>): void => {
        this.availableFilters = filters;

        this.brandsFilters = this.brandsFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.colorFilters = this.colorFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.sizesFilter = this.sizesFilter.filter(f => filters.find(af => f.id === af?.filterId));
        this.ageFilter = this.ageFilter.filter(f => filters.find(af => f.id === af?.filterId));
        this.fitFilters = this.fitFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.genreFilters = this.genreFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.productTypeFilters = this.productTypeFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.shopsFilters = this.shopsFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.storageSizeFilters = this.storageSizeFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.tasteTypeFilters = this.tasteTypeFilters.filter(f => filters.find(af => f.id === af?.filterId));
        this.countriesOfOriginFilters = this.countriesOfOriginFilters.filter(f => filters.find(af => f.id === af?.filterId));
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

    this.selectedFilterIds = this.selectedFilterIds.filter((id: string): boolean => filterId !== id);
  }

  private getUrlToNavigateTo(): string {

    if (!this.navigationService.activeNavigationItem?.pathPartsForNavigation?.length) {
      return this.router.url;
    }

    return `/${this.navigationService.activeNavigationItem.pathPartsForNavigation.join('/')}`;
  }

  public applyFilters(): void {
    let urlTree: UrlTree = this.router.parseUrl(this.getUrlToNavigateTo());

    urlTree.queryParams['p_min'] = this.minimumPrice;
    urlTree.queryParams['p_max'] = this.maximumPrice;

    if (this.selectedFilterIds.length) {
      urlTree.queryParams['filters'] = this.selectedFilterIds.join('-');
    }
    else { delete urlTree.queryParams['filters']; }

    delete urlTree.queryParams['noResults'];

    this.router.navigateByUrl(urlTree.toString()).then((): void => {
      window.location.reload();
    });

    this.isLoading = true;
  }

  get isClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
