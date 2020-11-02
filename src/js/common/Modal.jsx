import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

export default class Modal extends PureComponent {
    static propTypes = {
        headerText: PropTypes.string,
        children: PropTypes.node,
        onClose: PropTypes.func
    };

    state = {
        shown: false
    };

    componentDidMount() {
        this.setState({shown: true});
    };

    _animationDuration = 200;
    _stopPropagation = e => e.stopPropagation();

    _close = () => {
        this.setState({shown: false});
        setTimeout(this.props.onClose, this._animationDuration);
    };

    render() {
        const {_animationDuration, _stopPropagation, _close, state: {shown}, props: {headerText, children}} = this;
        return (
            <CSSTransition in={shown} timeout={_animationDuration} classNames="modal">
                <div className="Modal-container" onClick={_close}>
                    <div className="Modal-body" onClick={_stopPropagation} >
                        <div className="Modal-close" onClick={_close} data-testid="modal-close">×</div>
                        <div className="Modal-title">{headerText}</div>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        );
    }
}
