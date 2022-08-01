import Footer from './'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../utils/test'

describe('Footer', () => {
  it('Should render without crashing', async () => {
    render(<Footer />)
  })
  it('Change theme', async () => {
    render(<Footer />)
    const nightModeButton = screen.getByText('☀️')
    expect(nightModeButton.textContent).toBe('☀️')
    fireEvent.click(nightModeButton)
    expect(nightModeButton.textContent).toBe('🌙')
  })
  it('Should add mail of the user at the text if the mail include @ and an error text if not', async () => {
    render(<Footer />)
    const input = screen.getByTestId('input')
    const textValue = screen.getByText('Abonnez-vous à notre newsletter !')
    const sendButton = screen.getByText('Envoyer')
    expect(textValue.textContent).toBe('Abonnez-vous à notre newsletter !')
    input.value = 'emaildetest@gmail.com'
    fireEvent.click(sendButton)
    expect(textValue.textContent).toBe(
      'emaildetest@gmail.com enregistré sur notre newsletter !'
    )
    input.value = 'emaildetestgmail.com'
    fireEvent.click(sendButton)
    expect(textValue.textContent).toBe(
      'Veuillez entrer une adresse mail valide.'
    )
  })
})
