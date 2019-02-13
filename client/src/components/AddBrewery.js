import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBreweriesQuery, addBreweryMutation } from '../queries/queries';

class AddBrewery extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            city:"",
            state:"",
            country:""
        };
    }

    submitForm(e){
        e.preventDefault();
        this.props.addBreweryMutation({
            variables: {
                name: this.state.name,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country
            },
            refetchQueries: [{query: getBreweriesQuery }]
        });
        e.target.reset();
    }

    render(){
        return(
            <form id="add-brewery" onSubmit={this.submitForm.bind(this)}>
                <p>Or, if you need to add a new Brewery:</p>
                <div>
                    <label>Brewery Name:</label>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value})}/>
                </div>

                <div>
                    <label>City:</label>
                    <input type="text" onChange={(e) => this.setState({ city: e.target.value})}/>
                </div>

                <div>
                    <label>State:</label>
                    <input type="text" onChange={(e) => this.setState({ state: e.target.value})}/>
                </div>

                <div>
                    <label>Country:</label>
                    <input type="text" onChange={(e) => this.setState({ country: e.target.value})}/>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(addBreweryMutation, { name: "addBreweryMutation" })
)(AddBrewery);