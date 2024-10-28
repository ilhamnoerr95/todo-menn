import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from "@/components/home"
// import {act} from 'react';
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />) // ARRANGE
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})