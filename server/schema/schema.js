const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const Beer = require('../models/beer');
const Brewery = require('../models/brewery');

const BeerType = new GraphQLObjectType({
    name: 'Beer',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        comment: { type: GraphQLString },
        abv: { type: GraphQLFloat },
        rating: { type: GraphQLInt },
        brewery: {
            type: BreweryType,
            resolve(parent, args){
                return Brewery.findById(parent.breweryId);
            }
        }
    })
});

const BreweryType = new GraphQLObjectType({
    name: 'Brewery',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        beers: {
            type: new GraphQLList(BeerType),
            resolve(parent, args){
                return Beer.find({ breweryId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        beer: {
            type: BeerType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Beer.findById(args.id);
            }
        },
        brewery: {
            type: BreweryType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Brewery.findById(args.id);
            }
        },
        beers: {
            type: new GraphQLList(BeerType),
            resolve(parent, args){
                return Beer.find({});
            }
        },
        breweries: {
            type: new GraphQLList(BreweryType),
            resolve(parent, args){
                return Brewery.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBrewery: {
            type: BreweryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                city: { type: new GraphQLNonNull(GraphQLString) },
                state: { type: new GraphQLNonNull(GraphQLString) },
                country: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let brewery = new Brewery({
                    name: args.name,
                    city: args.city,
                    state: args.state,
                    country: args.country
                });
                return brewery.save();
            }
        },
        
        addBeer: {
            type: BeerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                abv: { type: new GraphQLNonNull(GraphQLFloat) },
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                breweryId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let beer = new Beer({
                    name: args.name,
                    type: args.type, 
                    comment: args.comment,
                    abv: args.abv,
                    rating: args.rating,
                    breweryId: args.breweryId
                });
                return beer.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});