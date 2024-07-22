import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button component', () => {
  it('should render the button with correct text', () => {
    render(<Button buttonText="Enter" buttonType="button" />)
    const button = screen.getByText('Enter')

    expect(button).toBeInTheDocument()
  })

  it('should have the correct type', () => {
    render(<Button buttonText="Submit" buttonType="submit" />)
    const button = screen.getByText('Submit')

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should call onClick when button is clicked', () => {
    const handleClick = vi.fn()
    render(<Button buttonText="Click Me" buttonType="button" onClick={handleClick} />)
    const button = screen.getByText('Click Me')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
