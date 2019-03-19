const url = 'https://warhammerunderworlds.com/wp-json/wp/v2/sets?';
const params = [
  'per_page=5',
  'orderby=id'
];
let sets = [];
fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then((data) => {
    // console.log(data);
    data.forEach(set => {
      sets.push({
        id: set.id,
        name: set.name,
        image: {
          url: set.acf.icon.url,
          width: set.acf.icon.width,
          height: set.acf.icon.height
        },
      });
    });
  }).then(() => {
    // console.log(sets);
  });

// const sets = [{
//   id: 'setType_0',
//   name: 'Steven Spielburg',
//   cardIds: [
//     'card_0',
//     'card_1',
//   ],
// },];

export default sets;
