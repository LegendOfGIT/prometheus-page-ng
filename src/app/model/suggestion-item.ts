export class SuggestionItem {
    label: string;
    mode: SuggestionItemMode = SuggestionItemMode.DEFAULT;

    constructor (label: string) {
      this.label = label;
    }

    isNewItem(): boolean {
      return this.mode === SuggestionItemMode.NEW;
    }

    isSearchItem(): boolean {
      return this.mode === SuggestionItemMode.SEARCH;
    }
}

export enum SuggestionItemMode {
  DEFAULT,
  NEW,
  SEARCH
}
