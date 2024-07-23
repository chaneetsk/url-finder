import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import AddModal from './AddModal'

describe('AddModal Component', () => {
  const onCloseMock = vi.fn()
  const updateUrlsMock = vi.fn()

  const setup = (show: boolean) => {
    render(
      <AddModal show={show} onClose={onCloseMock} updateUrls={updateUrlsMock} />
    )
  }

  it('should not render when show is false', () => {
    setup(false)
    expect(screen.queryByText('Add Search Engine')).toBeNull()
  })

  it('should render when show is true', () => {
    setup(true)
    expect(screen.getByText('Add Search Engine')).toBeInTheDocument()
  })

  it('should call onClose when clicking outside the modal', () => {
    setup(true)
    const overlay = screen.getByTestId('overlay')
    fireEvent.click(overlay)
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('should update formData on input change', () => {
    setup(true)

    const searchEngineInput = screen.getByPlaceholderText('Keywords')
    const urlInput = screen.getByPlaceholderText('Url')

    fireEvent.change(searchEngineInput, { target: { value: 'Test' } })
    fireEvent.change(urlInput, { target: { value: 'https://www.test.com' } })

    expect(searchEngineInput).toHaveValue('Test')
    expect(urlInput).toHaveValue('https://www.test.com')
  })

  it('should call updateUrls and onClose on form submit', () => {
    setup(true)

    const searchEngineInput = screen.getByPlaceholderText('Keywords')
    const urlInput = screen.getByPlaceholderText('Url')
    const form = screen.getByRole('form')

    fireEvent.change(searchEngineInput, { target: { value: 'Test' } })
    fireEvent.change(urlInput, { target: { value: 'https://www.test.com' } })

    fireEvent.submit(form)

    expect(updateUrlsMock).toHaveBeenCalledWith({
      newSearchEngine: 'Test',
      url: 'https://www.test.com',
    })
    expect(onCloseMock).toHaveBeenCalled()
  })
})
