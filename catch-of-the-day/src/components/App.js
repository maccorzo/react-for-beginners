import React from 'react';
import Header from './Header'
import Order from './Order'
import Fish from './Fish'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {

    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish = (fish) => {
    // update state
    const fishes = { ...this.state.fishes };
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;
    // set state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  removeFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSample = () => {
    this.setState({
      fishes: sampleFishes
    })
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          removeFish={this.removeFish}
          loadSample={this.loadSample}
          fishes={this.state.fishes}
          storeId={this.props.params.storeId}
          updateFish={this.updateFish} />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
