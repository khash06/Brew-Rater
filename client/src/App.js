import React, { Component } from 'react';
import BeerList from './components/BeerList';
import AddBeer from './components/AddBeer';
import AddBrewery from './components/AddBrewery';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Brew Rater</h1>
          <BeerList />
          <AddBeer />
          <AddBrewery />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
