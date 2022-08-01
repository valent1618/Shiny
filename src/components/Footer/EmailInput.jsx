import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputButtonContainer = styled.div`
  display: flex;
  margin: 10px 0;
`

const Input = styled.input`
  text-align: center;
  border: ${colors.primary} 2px solid;
  border-radius: 20px 0 0 20px;
  &:focus-visible {
    outline: 0;
  }
`

const SendButton = styled.button`
  background-color: ${colors.primary};
  border: none;
  color: white;
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 0 20px 20px 0;
`

function EmailInput() {
  const [textBeforeInput, setTextBeforeInput] = useState(
    'Abonnez-vous à notre newsletter !'
  )

  return (
    <InputContainer>
      <span>{textBeforeInput}</span>
      <InputButtonContainer>
        <Input id="input" data-testid="input" />
        <SendButton
          onClick={() => {
            document.getElementById('input').value.includes('@')
              ? setTextBeforeInput(
                  `${
                    document.getElementById('input').value
                  } enregistré sur notre newsletter !`
                )
              : setTextBeforeInput('Veuillez entrer une adresse mail valide.')
          }}
        >
          Envoyer
        </SendButton>
      </InputButtonContainer>
    </InputContainer>
  )
}

export default EmailInput
