import { gql } from 'apollo-boost';

const getBreweriesQuery = gql`{
    breweries {
        name
        id
    }
}`

const getBeersQuery = gql`{
    beers {
        name
        id
    }
}`

const addBeerMutation = gql`
mutation($name: String!, $type: String!, $comment: String!, $abv: Float!, $rating: Int!, $breweryId: ID!){
    addBeer(name: $name, type: $type, comment: $comment, abv: $abv, rating: $rating, breweryId: $breweryId){
        name
        id
    }
}`

const addBreweryMutation = gql`
mutation($name: String!, $city: String!, $state: String!, $country: String!){
    addBrewery(name: $name, city: $city, state: $state, country: $country){
        name
        city
        state
        country
    }
}`

const getBeerQuery = gql`
    query($id: ID) {
        beer(id: $id) {
            id 
            name
            type
            abv
            rating
            comment
            brewery{
                id
                name
                city
                state
                country
                beers {
                    name
                    type
                }
            }
        }
    }`

    export {getBeerQuery, getBeersQuery, addBeerMutation, getBreweriesQuery, addBreweryMutation };