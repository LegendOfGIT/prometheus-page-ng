import { StoryElement } from './story-element';

export class Story {
    canonical: string = '';
    title: string = '';
    elements: StoryElement[] = [];
    navigationId?: string;
}
