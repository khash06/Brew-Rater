import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBreweriesQuery, addBeerMutation, getBeersQuery } from '../queries/queries';

class AddBeer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            type:"",
            abv: "",
            rating: "",
            comment:"",
            breweryId:""
        };
    }
    displayBreweries(){
        var data= this.props.getBreweriesQuery;
        if(data.loading){
            return(<option disabled>Loading Breweries...</option>)
        } else {
            return data.breweries.map(brewery => {
                return(<option key={ brewery.id } value={ brewery.id }>{ brewery.name }</option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addBeerMutation({
            variables: {
                name: this.state.name,
                type: this.state.type,
                abv: Number.parseFloat(this.state.abv),
                rating: Number.parseInt(this.state.rating, 10),
                comment: this.state.comment,
                breweryId: this.state.breweryId
            },
            refetchQueries: [{ query: getBeersQuery }]
        });
        e.target.reset();
    }

    render(){
        return(
            <form id="add-beer" onSubmit={this.submitForm.bind(this)}>
            <div className="field">
                <label>Beer name:</label>
                <input type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
            </div>

            <div className="field">
                <label>Type:</label>
                <input type="text" onChange={(e) => this.setState({ type: e.target.value })}/> 
            </div>

            <div className="field">
                <label>ABV:</label>
                <input type="number" step="0.1" onChange={(e) => this.setState({ abv: e.target.value })}/> 
            </div>

            <div className="field">
                <label>Rating:</label>
                <input type="number" min="0" max="5" onChange={(e) => this.setState({ rating: e.target.value })}/> 
            </div>

            <div className="field">
                <label>Comment:</label>
                <input type="text" onChange={(e) => this.setState({ comment: e.target.value })}/> 
            </div>

            <div className="field">
                <label>Brewery:</label>
                <select onChange={(e) => this.setState({ breweryId: e.target.value })}>
                    <option>Select Brewery</option>
                    { this.displayBreweries() }
                </select>
            </div>
            <button>+</button>
        </form>
        );
    }
}

export default compose(
    graphql(getBreweriesQuery, { name: "getBreweriesQuery" }),
    graphql(addBeerMutation, { name: "addBeerMutation" })
)(AddBeer);