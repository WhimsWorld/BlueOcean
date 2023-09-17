import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Counter from './counter';
import store from './app/store';

describe('Counter', () => {
  it('renders Counter component', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const incrementButton = getByTestId('increment5');
    fireEvent.click(incrementButton);
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });
});
