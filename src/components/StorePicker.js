import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    static propTypes = {
        hisoty: PropTypes.object
    };

    myInput = React.createRef();
    goToStore = event => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. Get text from input
        const storeName = this.myInput.current.value;
        // 3. Change the page to  /store/name
        this.props.history.push(`/store/${storeName}`);
    }

    handleClick() {
        alert('heeeey');
    }
    //goToStore(event) {
    //    if you use a normal function (not a property with arrow function)
    //    in order to access "this" you need to bind it as is not a default react function
    //    constructor() {
    //       super();
    //       this.goToStore = this.goToStore.bind(this);
    //    }
    //}
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>

                { /* Dont put the () in the function or it will be executed when it mounts the component */}
                <button onClick={this.handleClick}>Click Me, I'm a Test</button>

                <input type="text"
                       ref={this.myInput}
                       required
                       placeholder="Store Name"
                       defaultValue={getFunName()}>
                </input>
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
    /* render() {
        return (
            <> { /* <React.Fragment></React.Fragment>  }
                <p>text</p>
                <p>Hello!</p>
            </>
        )
    } */
}

export default StorePicker;