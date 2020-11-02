import React from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Field, Form, Formik } from 'formik';
import { updateSelected } from '../spot/spot-actions';
import Button from '../common/Button';
import SpotItem from '../spot/SpotItem';
import TextButton from '../common/TextButton';
import axios from 'axios';
import { updateUser } from './checkout-actions';

const Checkout = ({spot, pushTo, user, setSpot, setUser}) => {
    const {firstName = '', lastName = '', email = '', phone = ''} = user || {};
    const _initialValues = {firstName, lastName, email, phone};
    const _onBackToSearchClick = evt => {
        setSpot(null);
        pushTo('/');
    };
    const _validation = values => {
        const errors = {};
        if (values.phone?.replace(/[^\d]/g, '').length < 10) {
            errors.phone = 'Please enter a valid phone number.';
        }
        if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Please enter a valid email.';
        }
        return errors;
    };
    const _validatedField = ({
        field,
        form,
        meta,
    }) => (
        <div>
            {
                field.name === 'phone'
                    ? <InputMask {...field} type="tel" mask="(999) 999-9999" maskChar=" "
                                 className={(meta.touched && meta.error && 'invalid') || ''}/>
                    : <input type="text" {...field} className={(meta.touched && meta.error && 'invalid') || ''}/>
            }
            {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
            )}
        </div>
    );
    const _onSubmit = async (values, {setSubmitting}) => {
        setUser(values);
        setSubmitting(true);
        try {
            await axios.post('/reservations', values);
            setSubmitting(false);
            pushTo('/confirmation');
        } catch (e) {
            setSubmitting(false);
            throw e;
        }
    };
    return (
        <div className="Checkout">
            <div className="Checkout-content">
                <div className="Checkout-header">
                    <TextButton onClick={_onBackToSearchClick}>
                        &lt; Back To Search
                    </TextButton>
                </div>
                <div className="Checkout-body">
                    <SpotItem data={spot} showDetails={false} padded={false}/>
                    <Formik
                        initialValues={_initialValues}
                        validate={_validation}
                        onSubmit={_onSubmit}
                    >
                        {({isSubmitting, isValid, dirty, validateForm}) => {
                            const _isSubmitDisabled = isSubmitting || !isValid || (!dirty && !user);
                            return (
                                <Form>
                                    <div>
                                        <label htmlFor="firstNameInput">First Name</label>
                                        <Field type="text" name="firstName" id="firstNameInput"/>
                                    </div>
                                    <div>
                                        <label htmlFor="lastNameInput">Last Name</label>
                                        <Field type="text" name="lastName" id="lastNameInput"/>
                                    </div>
                                    <div>
                                        <label htmlFor="emailInput">Email</label>
                                        <Field type="email" name="email">
                                            {_validatedField}
                                        </Field>
                                    </div>
                                    <div>
                                        <label htmlFor="phoneInput">Phone</label>
                                        <Field type="text" name="phone" id="phoneInput">
                                            {_validatedField}
                                        </Field>
                                    </div>
                                    <div className="controls">
                                        <Button color="go" type="submit" disabled={_isSubmitDisabled}>
                                            Purchase for ${(spot.price / 100).toFixed(2)}
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

Checkout.propTypes = {
    spot: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushTo: PropTypes.func.isRequired,
    setSpot: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.checkout.user
});

const mapDispatchToProps = {
    pushTo: push,
    setSpot: updateSelected,
    setUser: updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
