import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useQuery } from 'react-query'
import { Loader } from '../../utils/style/Atom'
import LinkToDisplay from './LinkToDisplay'
import { useSelector } from 'react-redux'
import { darkMode } from '../../utils/selectors'
import { answers } from '../../utils/selectors'
import { useDispatch } from 'react-redux'
import { saveAnswer } from '../../features/survey'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10%;
  min-height: 50vh;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  font-size: 1.5em;
  margin: 70px 10%;
  text-align: center;
`

const ReplyBox = styled.button`
  font-size: 1.2em;
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isDarkMode }) =>
    isDarkMode
      ? `background: ${colors.backgroundDark};color:white`
      : `background: ${colors.backgroundLight}`};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${({ isSelected }) =>
    isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  font-weight: ${({ isSelected }) => (isSelected ? `bold` : `normal`)};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
  const isDarkMode = useSelector(darkMode)
  const { questionNumber } = useParams()
  const number = Number(questionNumber)

  const { isLoading, error, data } = useQuery('Survey', async () => {
    const response = await fetch('http://localhost:8000/survey')
    const data = await response.json()
    return data.surveyData
  })

  const dispatch = useDispatch()

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2>
          Oups.. Nous ne trouvons plus les questions ! Veuillez réessayer dans
          un instant..
        </h2>
      ) : (
        <QuestionContent>{data && data[questionNumber]}</QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => dispatch(saveAnswer({ [questionNumber]: true }))}
          isSelected={useSelector(answers)[questionNumber] === true}
          isDarkMode={isDarkMode}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => dispatch(saveAnswer({ [questionNumber]: false }))}
          isSelected={useSelector(answers)[questionNumber] === false}
          isDarkMode={isDarkMode}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkToDisplay number={number} />
    </SurveyContainer>
  )
}

export default Survey
