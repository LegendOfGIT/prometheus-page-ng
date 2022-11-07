export class SearchProfileItem {
    id: string = '';
    categoryId: string = '';
    subCategoryId: string = '';

    constructor(id: string, categoryId: string, subCategoryId: string) {
      this.id = id;
      this.categoryId = categoryId;
      this.subCategoryId = subCategoryId;
    }
}
