import React from 'react';
import AddFishForm from '../components/AddFishForm';
class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSample}>Add sample</button>
      </div>
    )
  }
}

export default Inventory;
