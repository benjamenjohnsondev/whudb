import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

promise.polyfill();

const tempUrl = 'https://warhammerunderworlds.com/wp-json/wp/v2/cards/?';
const params = [
  'per_page=1000',
  'orderby=id'
];
function buildUrl(tempUrl, params) {
  return tempUrl + params.join('&');
}
let Cards = [];
let Images = [];
fetch(buildUrl(tempUrl, params))
  .then((resp) => resp.json())
  .then((data) => {
    // console.log(data[0]);
    data.forEach(card => {
      Images.push({
        id: card.acf.card_image.id,
        url: card.acf.card_image.url,
        width: card.acf.card_image.width,
        height: card.acf.card_image.height
      });
      Cards.push({
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

export {Cards, Images};
