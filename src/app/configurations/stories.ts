import {Story} from 'src/app/model/story';
import {StoryElementType} from 'src/app/model/story-element';

export class Stories {
  public static ITEMS: Story[] = [
    {
      canonical: '60-jahre-sophie-la-girafe',
      title: '60 Jahre SOPHIE LA GIRAFE',
      elements: [
        {
          type: StoryElementType.Title,
          content: '✨ 60 Jahre SOPHIE LA GIRAFE – die limitierte Jubiläumsedition ist da! ✨'
        },
        {
          type: StoryElementType.Block,
          content: 'Wir freuen uns so sehr, euch die <b>exklusive Limited Edition "SOPHIE LA GIRAFE by me"</b> zu präsentieren! 🦒💛'
        },
        {
          type: StoryElementType.Image,
          content: 'https://m.media-amazon.com/images/I/31aU8h1r+tL.jpg'
        },
        {
          type: StoryElementType.Block,
          content: 'Hier geht es zur -> <a href="/p/645aab4543fdfb0ab36fd3eb/sophie-la-girafe-la-giraffe-60-jahre-limited-edition-sophie-la-girafe-by-me-616402-beigewei">Beißgiraffe</a>'
        },
        {
          type: StoryElementType.Block,
          content: 'Seit über 60 Jahren bringt <b>Sophie la Girafe</b> Babys zum Lächeln und begleitet sie in ihren ersten Lebensmonaten – jetzt in einem ganz besonderen Design in <b>Beige/Weiß</b>. Diese <b>Jubiläumsedition</b> vereint zeitlose Eleganz mit der vertrauten Qualität, die wir so lieben. 💫'
        },
        {
          type: StoryElementType.Block,
          content: '<b>SOPHIE LA GIRAFE</b> steht für höchste Qualität, Sicherheit und Liebe zum Detail – genau das, was wir uns für unsere Kleinen wünschen! Auf We Wanna Shop findet ihr jetzt viele weitere <b>klassische Babyspielzeuge, nachhaltige Babyprodukte</b> und modische Accessoires, die den Alltag eurer Babys und Kinder noch schöner machen.'
        },
        {
          type: StoryElementType.Block,
          content: 'Schaut euch um und entdeckt hochwertige <a href="/kids/toys/babies?p_min=22&p_max=200">Babyspielwaren und nachhaltige Geschenkideen</a> für Babys! 💕'
        }
      ]
    }
  ];
}
