import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import illustration from '../../assets/home-illustration.svg'
import { useSelector } from 'react-redux'
import { darkMode } from '../../utils/selectors'

const HomeContainer = styled.div`
  background: ${({ isDarkMode }) =>
    isDarkMode ? colors.backgroundDark : colors.backgroundLight};
  margin: 50px;
  padding: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 90vh;
`

const TextDiv = styled.div`
  font-size: 1.5em;
`

const ButtonTest = styled(Link)`
  display: block;
  width: 50%;
  text-align: center;
  padding: 15px;
  margin-top: 70px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  border-radius: 30px;
  background-color: ${colors.primary};
`

const Illustration = styled.img``

function Home() {
  return (
    <HomeContainer isDarkMode={useSelector(darkMode)}>
      <TextDiv>
        <h1>Repérez vos besoins, </h1>
        <h1>on s'occupe du reste, </h1>
        <h1>avec les meilleurs</h1>
        <h1>talents</h1>
        <ButtonTest to="/survey/1">Faire le test</ButtonTest>
      </TextDiv>
      <Illustration src={illustration} />
    </HomeContainer>
  )
}

export default Home
