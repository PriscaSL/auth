import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App'; // Chemin vers votre composant App

test('renders login heading', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headingElement = screen.getByText(/login to your account/i);
  expect(headingElement).toBeInTheDocument();
});
