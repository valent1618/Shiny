import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

import { useSelector } from 'react-redux'
import { darkMode } from '../../utils/selectors'
import { useStore } from 'react-redux'
import { fetchSurveyData } from '../../features/survey'

const LinkWrapper = styled.h3`
  padding-top: 30px;
  & a {
    margin: 20px;
    color: ${({ isDarkMode }) => (isDarkMode ? 'white' : colors.darkGrey)};
    text-decoration: underline;
    text-decoration-color: ${colors.primary};
  }
`

function LinkToDisplay({ number }) {
  const store = useStore()

  let link1, link2
  if (number > 1) {
    link1 = <Link to={'/survey/' + (number - 1)}>Précédent</Link>
  }
  if (number < 6) {
    link2 = <Link to={'/survey/' + (number + 1)}>Suivant</Link>
  }
  if (number === 6) {
    link2 = (
      <Link to="/results" onClick={() => fetchSurveyData(store)}>
        Results
      </Link>
    )
  }

  return (
    <LinkWrapper isDarkMode={useSelector(darkMode)}>
      {link1}
      {link2}
    </LinkWrapper>
  )
}

export default LinkToDisplay
