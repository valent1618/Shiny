import styled from 'styled-components'
import colors from '../../utils/style/colors'
import EmailInput from './EmailInput'
import { useDispatch, useSelector } from 'react-redux'
import { toggle as toggleTheme } from '../../features/theme'
import { darkMode } from '../../utils/selectors'

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
`

const NightModeButton = styled.button`
  background: ${({ isDarkMode }) =>
    isDarkMode ? colors.backgroundDark : colors.backgroundLight};
  padding: 10px;
  font-size: 2em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: ${colors.secondary};
`

const Latt = styled.a`
  font-family: montserrat;
  text-decoration: none;
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : colors.darkGrey)};
  &:hover {
    color: #39b54a;
  }
`

function Footer() {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(darkMode)

  return (
    <FooterContainer>
      <EmailInput />
      <NightModeButton
        onClick={() => dispatch(toggleTheme())}
        isDarkMode={isDarkMode}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </NightModeButton>
      <p>
        Site réalisé par{' '}
        <Latt
          href="https://latt.dev/"
          target="_blank"
          rel="noreferrer"
          isDarkMode={isDarkMode}
        >
          © Lätt.
        </Latt>{' '}
        2021
      </p>
    </FooterContainer>
  )
}

export default Footer
