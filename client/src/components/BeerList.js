import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBeersQuery } from '../queries/queries';
import BeerDetails from './BeerDetails';

class BeerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    DisplayBeers() {
        var data = this.props.data;
        if(data.loading) {
            return(<div>Loading Beers...</div>)
        } else {
            return data.beers.map(beer => {
                return(
                    <li key={ beer.id } onClick={(e) => {this.setState({ selected: beer.id })}}>{ beer.name }</li>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="beer-list">
                    { this.DisplayBeers() }
                </ul>
                <BeerDetails beerid={this.state.selected} />
            </div>
        );
    }
}

export default graphql(getBeersQuery)(BeerList);