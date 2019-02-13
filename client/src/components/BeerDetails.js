import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBeerQuery } from '../queries/queries';

class BeerDetails extends Component {
    displayBeerDetails() {
        const {beer} = this.props.data;
        if(beer){
            return(
                <div>
                    <h2>{beer.name}</h2>
                    <p>Type: {beer.type}</p>
                    <p>ABV: {beer.abv}%</p>
                    <p>Rating: {beer.rating}</p>
                    <p>Comment: {beer.comment}</p>
                    <p>Brewery: {beer.brewery.name}</p>
                    <p>City: {beer.brewery.city}</p>
                    <p>State: {beer.brewery.state}</p>
                    <p>Country: {beer.brewery.country}</p>
                    <p>All beers by this brewery:</p>
                    <ul className="other-beers">
                        {beer.brewery.beers.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return(
                <div>No beer selected...</div>
            )
        }
    }

    render() {
        return(
            <div id="beer-details">
                {this.displayBeerDetails()}
            </div>
        );
    }
}

export default graphql(getBeerQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.beerid
            }
        }
    }
})(BeerDetails)
