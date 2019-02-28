import cards from '../CardData/Card/raw';
import cardTypes from '../CardData/CardType/raw';
import sets from '../CardData/CardSet/raw';

const resolvers = {
  Query: {
    allCards: (_root, _args, _context) => {
      return cards.filter(card => card.sets !== null);
    },
    topCardByRevenue: (_root, _args, _context) => {
      const cardsByValueDesc = cards.sort((cardA, cardB) => (cardA.revenue < cardB.revenue));

      return cardsByValueDesc[0];
    },
    cardById: (_root, args, _context) => {
      return cards.find(card => card.id === args.id);
    },
    cardsById: (_root, args, _context) => {
      let cardsArray = [];
      args.ids.forEach(argId => {
        cardsArray.push(
          cards.find(card => {
            return card.id === argId;
          }));
      });
      return cardsArray;
    },
    cardsBySet: (_root, args, _context) => {
      return cards.filter(
        (card) => {
          return card.sets.find(set => args.id == set);
        }
      );
    },
    cardsByType: (_root, args, _context) => {
      return cards.filter(
        (card) => {
          // console.log(card);
          return card.cardTypes.find(cardtype => args.id == cardtype);
        }
      );
    },
    allSets: (_root, _args, _context) => {
      return sets;
    }
  },
  // Mutation: {
  //   createCard: (_root, args, _context) => {
  //     const newCard = {
  //       id: `${++cardIdIndex}`,
  //       ...args
  //     };

  //     cards.push(newCard);

  //     return newCard;
  //   },
  //   addSetsToCard: (_root, args, _context) => {
  //     const newSet = {
  //       id: `set_${++setIdIndex}`,
  //       cardIds: [args.cardId],
  //       ...args.set
  //     };

  //     sets.push(newSet);

  //     return cards.find(card => card.id === args.cardId);
  //   }
  // },
  CardType: {
    cards: (root, _args, _context) => {
      return cards.filter(
        (card) => {
          return card.cardTypes.find(cardType => root.id == cardType);
        }
      );
    }
  },
  Set: {
    cards: (root, _args, _context) => {
      return cards.filter(
        (card) => {
          return card.sets.find(set => root.id === set);
        }
      );
    }
  },
  Card: {
    sets: (root, _args, _context) => {
      let setsArray = [];
      root.sets.forEach(cardSet => {
        setsArray.push(
          sets.find(set => {
            return set.id === cardSet;
          })
        );
      });
      return setsArray;
    },
    cardTypes: (root, _args, _context) => {
      let cardTypeArray = [];
      root.cardTypes.forEach(cardType => {
        cardTypeArray.push(
          cardTypes.find(singleCardType => {
            return cardType === singleCardType.id;
          })
        );
      });
      return cardTypeArray;
    }
  },
};

export default resolvers;
