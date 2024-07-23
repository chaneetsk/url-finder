import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import SearchForm from './SearchForm'

describe('SearchForm Component', () => {
  const mockOnSubmit = vi.fn();
  const searchEngines = ['google', 'bing'];

  beforeEach(() => {
    render(<SearchForm onSubmit={mockOnSubmit} searchEngine={searchEngines} />);
  });

  it('should render the form elements', () => {
    expect(screen.getByLabelText('Enter Keywords')).toBeInTheDocument()
    expect(screen.getByLabelText('Enter URL')).toBeInTheDocument()
    searchEngines.forEach((engine) => {
      expect(screen.getByLabelText(engine)).toBeInTheDocument()
    })
    expect(screen.getByText('submit')).toBeInTheDocument()
  })

  it('should show error when submitting without URL and search engine', () => {
    fireEvent.change(screen.getByLabelText('Enter Keywords'), { target: { value: 'test keywords' } })
    fireEvent.change(screen.getByLabelText('Enter URL'), { target: { value: '' } })
    fireEvent.click(screen.getByText('submit'))

    expect(screen.getByText('Error: missing url and/or search engine')).toBeInTheDocument()
  })

  it('should submit the form data correctly', () => {
    fireEvent.change(screen.getByLabelText('Enter Keywords'), { target: { value: 'test' } })
    fireEvent.change(screen.getByLabelText('Enter URL'), { target: { value: 'www.test.com' } })
    fireEvent.click(screen.getByLabelText('google'))
    fireEvent.click(screen.getByText('submit'))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      keywords: 'test',
      url: 'www.test.com',
      searchEngine: ['google']
    })
  })

  it('should update the form data correctly on input change', () => {
    const keywordsInput = screen.getByLabelText('Enter Keywords')
    fireEvent.change(keywordsInput, { target: { value: 'test' } })
    expect(keywordsInput).toHaveValue('test')

    const urlInput = screen.getByLabelText('Enter URL')
    fireEvent.change(urlInput, { target: { value: 'www.newtest.com' } })
    expect(urlInput).toHaveValue('www.newtest.com')
  })

  it('should update the checkboxes correctly on change', () => {
    const googleCheckbox = screen.getByLabelText('google')
    fireEvent.click(googleCheckbox)
    expect(googleCheckbox).toBeChecked()

    const bingCheckbox = screen.getByLabelText('bing')
    fireEvent.click(bingCheckbox)
    expect(bingCheckbox).toBeChecked()

    fireEvent.click(googleCheckbox)
    expect(googleCheckbox).not.toBeChecked()
  })
})
