import React from 'react';
import PropTypes from 'prop-types';

// When there is only render, you can convert it to stateless
// class Header extends React.Component {
//     render() {
//         return (
//             <header className="top">
//                 <h1>Catch
//                     <span className="ofThe">
//                         <span className="of">of</span>
//                         <span className="the">the</span>
//                     </span>
//                     Day
//                 </h1>
//                 <h3 className="tagline">
//                     <span>{this.props.tagline}</span>
//                 </h3>
//             </header>
//         )
//     }
// }

//function Header(props) { return (...) };
//const Header = (props) => () Implicit return
const Header = props => (
    <header className="top">
        <h1>Catch
            <span className="ofThe">
                <span className="of">of</span>
                <span className="the">the</span>
            </span>
            Day
        </h1>
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
);

// As this component is stateless we do this after the fact
Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;