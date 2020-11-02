import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import { Link } from 'react-router-dom';

const SpotDetails = ({spot: {id, title, description, price}}) => {
    return (
        <div className="SpotDetails">
            <div className="title">{title}</div>
            <p className="description">{description}</p>
            <div className="cta">
                <Link to={`${id}/checkout`}>
                    <Button className="Button-primary">${(price / 100).toFixed(2)} | Book it!</Button>
                </Link>
            </div>
        </div>
    );
};

SpotDetails.propTypes = {
    spot: PropTypes.object.isRequired
};


export default SpotDetails;
