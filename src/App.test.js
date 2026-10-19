import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the main navigation', () => {
  render(<App />)

  expect(screen.getByRole('navigation')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: 'Nuevo personaje' })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: 'Modificar personaje' })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /series/i })
  ).toBeInTheDocument()
})
