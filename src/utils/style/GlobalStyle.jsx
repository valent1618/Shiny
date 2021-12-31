import { createGlobalStyle } from 'styled-components'
import colors from './colors'
import { useSelector } from 'react-redux'
import { darkMode } from '../selectors'

const StyledGlobalStyle = createGlobalStyle`
* {
  font-family: 'Trebuchet MS', Helvetica, sans-serif;
}
body{
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? `${colors.darkGrey}` : 'white'};
    color: ${({ isDarkMode }) => (isDarkMode ? 'white' : `${colors.darkGrey}`)}
}`

function GlobalStyle() {
  return <StyledGlobalStyle isDarkMode={useSelector(darkMode)} />
}

export default GlobalStyle
