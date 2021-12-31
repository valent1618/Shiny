import { screen } from '@testing-library/react'
import Card from './'
import { render } from '../../utils/test'

describe('Card', () => {
  it('should render label and image', async () => {
    render(<Card label="Sorcier" picture="photobidon.png" />)
    const cardImage = screen.getByRole('img')
    const cardTitle = screen.getByText(/Sorcier/i)
    expect(cardImage.src).toBe('http://localhost/photobidon.png')
    expect(cardTitle.textContent).toBe('Sorcier')
  })
})
