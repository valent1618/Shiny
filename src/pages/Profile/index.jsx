import { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atom'
import { useSelector } from 'react-redux'
import { darkMode } from '../../utils/selectors'
import { dataProfileLoading } from '../../utils/selectors'
import { selectProfile } from '../../utils/selectors'
import { fetchOrUpdateProfile } from '../../features/profile'
import { useStore } from 'react-redux'

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 15vh 90px;
  min-height: 20vh;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? colors.backgroundDark : colors.backgroundLight};
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : colors.dark)};
`

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid ${({ isDarkMode }) => (isDarkMode ? 'white' : colors.dark)};
`

const Availability = styled.span`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ available }) => (available ? 'green' : 'red')};
    content: '';
  }
  padding-left: 20px;
  position: relative;
`

function Profile() {
  const isDarkMode = useSelector(darkMode)
  const { id: queryId } = useParams()
  const store = useStore()

  useEffect(() => {
    fetchOrUpdateProfile(store, queryId)
  }, [store, queryId])

  const isLoading = useSelector(dataProfileLoading)
  const error = useSelector(selectProfile).error
  const profileData = useSelector(selectProfile).data

  const { picture, name, location, tjm, job, skills, available, id } =
    profileData !== null && profileData

  return (
    <ProfileContainer isDarkMode={isDarkMode}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2>
          Oups.. Nous ne trouvons plus le freelancer ! Veuillez réessayer dans
          un instant..
        </h2>
      ) : (
        <ProfileWrapper>
          <Picture src={picture} alt={name} height={150} width={150} />
          <ProfileDetails isDarkMode={isDarkMode}>
            <TitleWrapper>
              <Title>{name}</Title>
              <Location>{location}</Location>
            </TitleWrapper>
            <JobTitle>{job}</JobTitle>
            <SkillsWrapper>
              {skills &&
                skills.map((skill) => (
                  <Skill key={`skill-${skill}-${id}`} isDarkMode={isDarkMode}>
                    {skill}
                  </Skill>
                ))}
            </SkillsWrapper>
            <Availability available={available}>
              {available ? 'Disponible maintenant' : 'Indisponible'}
            </Availability>
            <Price>{tjm} € / jour</Price>
          </ProfileDetails>
        </ProfileWrapper>
      )}
    </ProfileContainer>
  )
}

export default Profile
