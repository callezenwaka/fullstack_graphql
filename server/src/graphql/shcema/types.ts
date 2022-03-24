import {GraphQLString, GraphQLID, GraphQLObjectType} from 'graphql';

const ClubType = new GraphQLObjectType({
  name: "Club",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    league: {type: GraphQLString}
  })
});

// export default ClubType;
export { ClubType };