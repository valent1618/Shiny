import styled from 'styled-components'
import colors from '../../utils/style/colors'
import Card from '../../components/Card'
import { Loader } from '../../utils/style/Atom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { darkMode, selectSurvey } from '../../utils/selectors'
import { useQuery } from 'react-query'
import FormatJob from '../../utils/format/formatJob'

const SectionProfiles = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 20%;
  min-height: 80vh;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`

const SubTitle = styled.p`
  color: ${colors.textLight};
  margin-top: 30px;
`

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const CategoryButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  background-color: ${({ selected }) =>
    selected ? colors.primary : colors.backgroundLight};
  color: ${({ selected }) => (selected ? 'white' : colors.darkGrey)};
  border: none;
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : colors.darkGrey)};
`

function Freelances() {
  const isDarkMode = useSelector(darkMode)
  const skills = useSelector(selectSurvey).skills

  const { isLoading, error, data } = useQuery('Freelances', async () => {
    const response = await fetch('http://localhost:8000/freelances')
    const data = await response.json()
    data.freelancersList.map(
      (profile) => (profile.category = FormatJob(profile.job))
    )
    return data.freelancersList
  })

  //categories
  const [categories, setCategories] = useState([])

  function AddCategory(category) {
    const isInclude = categories.find((cat) => cat.name === category)
    if (!isInclude) {
      let selectedSkill = skills.includes(category)
      if (category === 'DESIGNER') {
        selectedSkill = skills.includes('DESIGN')
      } else if (category === 'FULLSTACK') {
        selectedSkill = skills.includes('BACKEND')
      }

      if (skills.length > 0 && !selectedSkill) {
        setCategories([...categories, { name: category, selected: false }])
      } else {
        setCategories([...categories, { name: category, selected: true }])
      }
    }
  }

  data !== undefined && data.map((profile) => AddCategory(profile.category))

  function SelectCategory(category) {
    const filterCategories = [
      ...categories.filter((cat) => cat.name !== category.name),
    ]
    setCategories([
      { name: category.name, selected: !category.selected },
      ...filterCategories,
    ])
  }

  return (
    <SectionProfiles>
      <TitleWrapper>
        <h1>Trouvez votre prestataire</h1>
        <SubTitle>
          Chez Shiny nous réunissons les meilleurs profils pour vous.
        </SubTitle>
      </TitleWrapper>
      {isLoading ? (
        <Loader data-testid="loader" />
      ) : error ? (
        <h2>
          Oups.. Nous ne trouvons plus les freelancers ! Veuillez réessayer dans
          un instant..
        </h2>
      ) : (
        <div>
          <CategoriesContainer>
            {categories.map((category) => (
              <CategoryButton
                key={`category-${category.name}`}
                selected={category.selected}
                onClick={() => {
                  SelectCategory(category)
                }}
              >
                {category.name}
              </CategoryButton>
            ))}
          </CategoriesContainer>
          <CardsContainer>
            {data.map(
              (profile, index) =>
                categories.find(
                  (cat) =>
                    cat.name === profile.category && cat.selected === true
                ) && (
                  <StyledLink
                    key={`freelance-${profile.id}`}
                    to={`/profile/${profile.id}`}
                    $isDarkMode={isDarkMode}
                  >
                    <Card
                      label={profile.job}
                      title={profile.name}
                      picture={profile.picture}
                    />
                  </StyledLink>
                )
            )}
          </CardsContainer>
        </div>
      )}
    </SectionProfiles>
  )
}

export default Freelances
