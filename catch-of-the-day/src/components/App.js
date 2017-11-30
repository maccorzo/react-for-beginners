import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSample = this.loadSample.bind(this);
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {
    // update state
    const fishes = {...this.state.fishes};
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;
    // set state
    this.setState({ fishes });
  }

  loadSample() {
    this.setState({
      fishes: sampleFishes
    })
  }

  render() {
    return (
      <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market"/>
      </div>
        <Order/>
        <Inventory addFish={this.addFish} loadSample={this.loadSample} />
      </div>
    )
  }
}

export default App;
