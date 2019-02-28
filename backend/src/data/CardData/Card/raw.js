import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

promise.polyfill();

const tempUrl = 'https://warhammerunderworlds.com/wp-json/wp/v2/cards/?';
const params = [
  'per_page=5',
  'orderby=id'
];
function buildUrl(tempUrl, params) {
  return tempUrl + params.join('&');
}
let cards = [];
let images = [];
fetch(buildUrl(tempUrl, params))
  .then((resp) => resp.json())
  .then((data) => {
    // console.log(data[0]);
    data.forEach(card => {
      images.push({
        id: card.acf.card_image.id,
        url: card.acf.card_image.url,
        width: card.acf.card_image.width,
        height: card.acf.card_image.height
      });
      cards.push({
        id: card.acf.card_number,
        image: {
          url: card.acf.card_image.url,
          width: card.acf.card_image.width,
          height: card.acf.card_image.height
        },
        name: card.title.rendered,
        sets: card.sets,
        cardTypes: card.card_types,
        warbands: card.warbands
      });
    });
  }).then(() => {
    // console.log(cards[0]);
  });

// const cards = [
//   {
//     id: 'card_0',
//     name: 'Arachnophobia',
//     tagline: 'Eight legs, two fangs, and an attitude.',
//     revenue: 53200000,
//   },
//   {
//     id: 'card_1',
//     name: 'Armageddon',
//     tagline: 'Earth. It was fun while it lasted.',
//     revenue: 553700000,
//   },
//   {
//     id: 'card_2',
//     name: 'Catch Me If You Can',
//     tagline: 'The true story of a real fake.',
//     revenue: 352100000,
//   },
//   {
//     id: 'card_3',
//     name: 'Christmas Vacation',
//     tagline: 'Yule crack up.',
//     revenue: 71300000,
//   },
// ];

export default {cards, images};
