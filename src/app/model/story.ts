import { StoryElement } from './story-element';

export class Story {
    id?: string = '';
    canonical: string = '';
    title: string = '';
    elements: StoryElement[] = [];
    navigationId?: string;
}
