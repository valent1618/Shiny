import darkLogo from '../../assets/dark-logo.png'
import lightLogo from '../../assets/light-logo.png'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { darkMode } from '../../utils/selectors'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
`

const Logo = styled.img`
  width: 200px;
`

const StyledLink = styled(Link)`
  padding: 15px;
  margin: 0 10px;
  color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : colors.secondary)};
  text-decoration: none;
  font-size: 18px;
  ${({ $isFullLink }) =>
    $isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`

function Header() {
  const isDarkMode = useSelector(darkMode)
  return (
    <HeaderWrapper>
      <Logo src={isDarkMode ? lightLogo : darkLogo} alt="shiny-logo" />
      <nav>
        <StyledLink to="/" $isDarkMode={isDarkMode}>
          Accueil
        </StyledLink>
        <StyledLink to="/freelances" $isDarkMode={isDarkMode}>
          Profils
        </StyledLink>
        <StyledLink to="/survey/1" $isFullLink>
          Faire le test
        </StyledLink>
      </nav>
    </HeaderWrapper>
  )
}

export default Header
