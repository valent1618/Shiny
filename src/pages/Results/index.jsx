import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'
import empty from '../../assets/empty.svg'
import { useSelector } from 'react-redux'
import { darkMode, dataSurveyLoading } from '../../utils/selectors'
import { selectSurvey } from '../../utils/selectors'
import { dataSurvey } from '../../utils/selectors'
import { Loader } from '../../utils/style/Atom'

const ResultsContainer = styled.div`
  background: ${({ isDarkMode }) =>
    isDarkMode ? colors.backgroundDark : colors.backgroundLight};
  margin: 50px;
  padding: 7% 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`
const ResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SkillsTitle = styled.h2`
  text-align: center;
  margin: 20px 20%;
`

const Skill = styled.span`
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : colors.primary)};
`

const ButtonSkills = styled(Link)`
  text-align: center;
  padding: 15px 30px;
  margin-top: 30px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  border-radius: 30px;
  background-color: ${colors.primary};
`

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
`

const TextSkillContainer = styled.div`
  margin: 15px 10%;
  font-size: 1.2em;
  line-height: 150%;
`

const SkillDescription = styled.p`
  margin: 0;
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : colors.secondary)};
`

const ImgDommage = styled.img`
  margin: 30px;
`

export function SkillsFormat(skill, numberOfSkills, index) {
  if (index === numberOfSkills - 1) {
    return ` ${skill}.`
  } else {
    return ` ${skill},`
  }
}

function Results() {
  const isDarkMode = useSelector(darkMode)
  const isLoading = useSelector(dataSurveyLoading)
  const error = useSelector(selectSurvey).error
  const skills = useSelector(dataSurvey)

  return (
    <ResultsContainer isDarkMode={isDarkMode}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2>
          Oups.. Une erreur avec l'API ! Veuillez réessayer dans un instant..
        </h2>
      ) : skills.length > 0 ? (
        <ResultDiv>
          <SkillsTitle>
            Les compétences dont vous avez besoin :
            {skills.map((skill, index) => (
              <Skill key={`title-${skill.title}`} isDarkMode={isDarkMode}>
                {SkillsFormat(skill.title, skills.length, index)}
              </Skill>
            ))}
          </SkillsTitle>
          <ButtonSkills to="/freelances">Découvrez nos profils</ButtonSkills>
          <SkillsContainer>
            {skills.map((skill) => (
              <TextSkillContainer key={skill.title}>
                <Skill isDarkMode={isDarkMode}>
                  {skill.title.charAt(0).toUpperCase() +
                    skill.title.substring(1).toLowerCase()}
                  <br />
                </Skill>
                <SkillDescription isDarkMode={isDarkMode}>
                  {skill.description}
                </SkillDescription>
              </TextSkillContainer>
            ))}
          </SkillsContainer>
        </ResultDiv>
      ) : (
        <ResultDiv>
          <h1>Dommage...</h1>
          <ImgDommage src={empty} />
          <h3>Il semblerait que vous n'ayez besoin d'aucune compétence</h3>
        </ResultDiv>
      )}
    </ResultsContainer>
  )
}

export default Results
