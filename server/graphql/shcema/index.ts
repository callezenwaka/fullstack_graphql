import { ClubType } from "../types";
import { GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';
import { seedData } from '../../seedData';

const clubs = {
	name: "Clubs",
	description: "This is the all club",
	type: new GraphQLList(ClubType),
	resolve: async (parent: any, args: any) => {
		const clubs = seedData;
		return clubs;
	}
};

const singleClub = {
	name: "singleClub",
	description: "This is the single club",
	type: ClubType,
	args: { id: { type: GraphQLID } },
	resolve: async (parent: any, args: { id: any; }) => {
		const club = await seedData.find(club => club.id === args.id);
		return club;
	}
};

const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	description: "This is the rootquery",
	fields: {
		clubs,
		singleClub
	}
});

export default RootQuery;