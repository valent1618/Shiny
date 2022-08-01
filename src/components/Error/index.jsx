import image404 from '../../assets/404.svg'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useSelector } from 'react-redux'
import { darkMode } from '../../utils/selectors'

const ErrorDiv = styled.div`
  background: ${({ isDarkMode }) =>
    isDarkMode ? colors.backgroundDark : colors.backgroundLight};
  margin: 50px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`
const ErrorImage = styled.img`
  margin: 50px;
`

function Error() {
  return (
    <ErrorDiv isDarkMode={useSelector(darkMode)}>
      <h1>Oups...</h1>
      <ErrorImage src={image404} alt="Error 404" />
      <h1>Il semblerait qu'il y ait un problème</h1>
    </ErrorDiv>
  )
}

export default Error
