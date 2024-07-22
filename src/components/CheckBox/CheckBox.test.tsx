import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import CheckBox from './CheckBox'

describe('CheckBox component', () => {
  it('should render the checkbox with correct label', () => {
    render(<CheckBox label="google" checked={true} onChange={() => {}} />)
    
    const label = screen.getByText('google')
    expect(label).toBeInTheDocument()
  })

  it('should be checked when the checked prop is true', () => {
    render(<CheckBox label="google" checked={true} onChange={() => {}} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should be unchecked when the checked prop is false', () => {
    render(<CheckBox label="google" checked={false} onChange={() => {}} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should call onChange when checkbox is clicked', () => {
    const handleChange = vi.fn()
    render(<CheckBox label="google" checked={false} onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
