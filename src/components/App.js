import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;
        // First reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    };
    componentDidUpdate() { 
        const {
            params
        } = this.props.match;
        localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
    };
    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addFish = fish => {
        // 1. take a copy of the existing state (in order to avoid mutation)
        const fishes = {...this.state.fishes};
        // 2. Add the new fish to the fishes var
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({
            // fishes: fishes => in ES& you can use better:
            fishes
        });
    };
    updateFish = (key, updatedFish) => {
        // 1. tak a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    }
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    };
    deleteFish = key => {
        // 1. take a copy of state
        const fishes = { ...this.state.fishes };
        // 2. update the state (firebase needs to be null to remove it)
        fishes[key] = null;
        // 3. update state
        this.setState({ fishes });
    };
    addToOrder = key => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. Either add to the order, or increment the number
        order[key] = order[key] + 1 || 1;
        // 3. call setState to update
        this.setState({ order });
    };
    removeFromOrder = key => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. remove that item from orders (no firebase, you can remove it)
        delete order[key];
        // 3. call setState to update 
        this.setState({ order });
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="IAX is cool"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key}
                                                                         index={key}
                                                                         details={this.state.fishes[key]}
                                                                         addToOrder = {this.addToOrder}
                                                                         />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory addFish={this.addFish}
                           updateFish={this.updateFish}
                           deleteFish={this.deleteFish}
                           loadSampleFishes={this.loadSampleFishes}
                           fishes={this.state.fishes}
                           storeId={this.props.match.params.storeId} />
            </div>
        )
    }
}

export default App;