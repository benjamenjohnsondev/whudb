import { makeExecutableSchema } from 'graphql-tools';
import Card from './CardData/Card/Type.graphql';
import CardType from './CardData/CardType/Type.graphql';
import CardSet from './CardData/CardSet/Type.graphql';
import Image from './CardData/Image/Type.graphql';
import Inputs from './Inputs/Type.graphql';
import Mutations from './Mutations/Mutations.graphql';
import Queries from './Queries/Queries.graphql';
import Resolvers from './resolvers/Resolvers';

const typeDefs = [
  Card,
  CardType,
  CardSet,
  Image,
  Inputs,
  Mutations,
  Queries
];

const Schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: Resolvers
});

export default Schema;
