import { StoryElement } from './story-element';

export class Story {
    id?: string = '';
    canonical: string = '';
    firstBlock?: string = '';
    title: string = '';
    titleImage?: string = '';
    elements?: StoryElement[] = [];
    navigationId?: string;
}
