import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import Modal from '../../js/common/Modal';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


const shown = true;
const stubs = {
    header: 'Example modal',
    subtitle: 'Modal subtitle',
    content: 'Modal content',
};

const component = shown && <Modal headerText="Example modal" onClose={stubs.onCloseCb}>
    <h3>{stubs.subtitle}</h3>
    <p>{stubs.content}</p>
</Modal>


describe('<Modal> component', () => {
    test('renders component with heading and content', async () => {
        const {getByText} = render(
            component
        );

        expect(getByText(stubs.header))
            .toBeInTheDocument();
        expect(getByText(stubs.subtitle))
            .toBeInTheDocument();
        expect(getByText(stubs.content))
            .toBeInTheDocument();
    });
    test('has a close button', async () => {
        const {getByTestId} = render(
            component
        );
        const closeButton = getByTestId('modal-close');
        expect(closeButton).toBeTruthy();
    });
    // ...
});
