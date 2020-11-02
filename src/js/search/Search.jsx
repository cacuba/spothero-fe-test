import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateSelected} from '../spot/spot-actions';
import SpotList from './spot-list/SpotList';
import Modal from '../common/Modal';
import SpotDetails from './spot-details/SpotDetails';
import { push } from "connected-react-router";

const Search = ({
    selectedSpot,
    spots,
    setSpot,
    pushTo
}) => {
    const { id } = useParams();
    useEffect(() => {
        if(id !== undefined) {
            setSpot(spots.find(spot => spot.id === +id))
        }
    }, [id, setSpot, spots]);

    const _onModalClose = () => {
        setSpot(null);
        pushTo('/');
    };

    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
            />
            <div className="Search-content">
                {selectedSpot &&
                    <Modal headerText="Spot Details" onClose={_onModalClose}>
                        <SpotDetails spot={selectedSpot}/>
                    </Modal>}
            </div>
        </div>
    );
};

Search.propTypes = {
    selectedSpot: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
    pushTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
    setSpot: updateSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
