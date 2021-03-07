import React from 'react';
import { render,  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Registration from './Registration';

describe('Rejestracja',() => {

  it('poprawnie sie wyswietla', () => {
    render(<Registration />);
    expect(screen.getByText('Rejestracja')).toBeInTheDocument();
    expect(screen.getByLabelText('Podaj imie')).toBeInTheDocument();
    expect(screen.getByLabelText('Podaj nazwisko')).toBeInTheDocument();
    expect(screen.getByLabelText('Podaj email')).toBeInTheDocument();
    expect(screen.getByLabelText('Podaj hasło')).toBeInTheDocument();
  });

  it('czy poprawnie sprawdza emaila', () => {
    render(<Registration />);
    screen.debug();
    const onClick = jest.fn()
    render(<input type="button" onClick={onClick} />)
    const button = screen.getAllByRole('button')
    expect(onClick).toBeChecked(1)
    expect(button).not.toBeChecked()

  });
});