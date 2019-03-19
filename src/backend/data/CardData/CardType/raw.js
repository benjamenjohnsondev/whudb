const url = 'https://warhammerunderworlds.com/wp-json/wp/v2/card_types?';
const params = [
  'per_page=5',
  'orderby=id'
];
let cardTypes = [];
fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then((data) => {
    // console.log(data);
    data.forEach(cardType => {
      cardTypes.push({
        id: cardType.id,
        name: cardType.name,
        image: {
          url: cardType.acf.icon.url,
          width: cardType.acf.icon.width,
          height: cardType.acf.icon.height
        }
      });
    });
  }).then(() => {
    // console.log(sets);
  });

// const cardType = [{
//   id: 'cardType_0',
//   name: 'Paramount',
//   location: 'Hollywood',
//   cardIds: [
//     'card_0',
//     'card_1',
//     'card_2',
//   ]
// },
// {
//   id: 'cardType_1',
//   name: 'Universal',
//   location: 'Universal City',
//   cardIds: [
//     'card_3',
//   ]
// },
// ];

export default cardTypes;
