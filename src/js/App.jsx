/* eslint-disable react/jsx-no-bind */
import {hot} from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Switch
} from 'react-router-dom';
import Checkout from './checkout/Checkout';
import Confirmation from './confirmation/Confirmation';
import Search from './search/Search';
import '../sass/main.scss';


const findSpotById = (spots, id) => spots.find(spot => spot.id === id)
const App = ({
    spots
}) => {
    return (
        <Switch>
            <Route
                path="/confirmation"
                component={Confirmation}
            />
            <Route
                exact
                path="/:id?"
                render={() => <Search spots={spots} />}
            />
            <Route
                path="/:id/checkout"
                render={({match: {params: {id}}}) => {
                    return <Checkout spot={findSpotById(spots, +id)} />;
                }}
            />
        </Switch>
    );
};

App.propTypes = {
    spots: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default hot(App);
