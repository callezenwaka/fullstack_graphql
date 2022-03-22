import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { ClubType } from "../types";
import { seedData } from '../../seedData';

const addClub = {
  name: "addClub",
  type: ClubType,
  args: { name: { type: GraphQLString }, league: { type: GraphQLString } },
  resolve: async (parent: any, args: { name: string; league: string; }) => {
    console.log(args.name, args.league);
    const new_club = seedData.push({ id: seedData.length + 1, name: args.name, league: args.league });
    return new_club;
  }
}

const deleteClub = {
  name: "deleteClub",
  type: ClubType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent: any, args: { id: any; }) => {
    const deleted_club = seedData.filter(club => club.id === args.id);
    return deleted_club;
  }
}

const updateClub = {
  name: "updatelub",
  type: ClubType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    league: { type: GraphQLString }
  },
  resolve: async (parent: any, args: { id: number; name: any; league: any; }) => {
    const club = seedData.findIndex(club => club.id === args.id);
		const update_club = seedData.splice(club, 1, { id: args.id, name: args.name, league: args.league });
    return update_club;
  }
}

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addClub,
    deleteClub,
    updateClub
  }
});

export default RootMutation;