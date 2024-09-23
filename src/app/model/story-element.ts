export class StoryElement {
    content: string = '';
    type: StoryElementType = StoryElementType.Block;
}

export enum StoryElementType {
  Block = 1,
  Image = 3,
  Title = 2
}
