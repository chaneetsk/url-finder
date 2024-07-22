import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TextField from './TextField'

describe('TextField component', () => {
  const handleChange = vi.fn()
  beforeEach(() => {
    render(<TextField textLabel="Name" textValue="Test" placeholderText="test" onChange={handleChange} />)
  })

  it('should render the TextField with correct label', () => {
    const label = screen.getByText('Name')
    expect(label).toBeInTheDocument()
  })

  it('should render with the correct placeholder', () => { 
    const input = screen.getByPlaceholderText('test')
    expect(input).toBeInTheDocument()
  })

  it('should call onChange when input value changes', () => {
    const input = screen.getByPlaceholderText('test')
    fireEvent.change(input, { target: { value: 'testing' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should have the correct initial value', () => {
    const input = screen.getByPlaceholderText('test')
    expect(input).toHaveValue('Test')
  })
})
