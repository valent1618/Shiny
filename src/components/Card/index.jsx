import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/profile.png'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useSelector } from 'react-redux'
import { darkMode } from '../../utils/selectors'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  margin: 30px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? colors.backgroundDark : colors.backgroundLight};
  border-radius: 30px;
  width: 250px;
  height: 250px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

const CardLabel = styled.span`
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : colors.primary)};
  font-size: 20px;
  margin-right: auto;
`
const CardImage = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`

const CardTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
`

function Card({ label, title, picture }) {
  const isDarkMode = useSelector(darkMode)
  return (
    <CardWrapper isDarkMode={isDarkMode}>
      <CardLabel isDarkMode={isDarkMode}>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <CardTitle>{title}</CardTitle>
    </CardWrapper>
  )
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
}

Card.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
}

export default Card

// class Card extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { isFavProfile: false }
//   }

//   updateFavProfile(isFavProfile) {
//     this.setState({ isFavProfile: !isFavProfile })
//   }

//   render() {
//     const { label, title, picture } = this.props

//     return (
//       <CardWrapper
//         // isDarkMode={useTheme() === 'dark'}
//         onClick={() => this.updateFavProfile(this.state.isFavProfile)}
//       >
//         <CardLabel
//         // isDarkMode={useTheme() === 'dark'}
//         >
//           {label}
//         </CardLabel>
//         <CardImage src={picture} alt="freelance" />
//         <CardTitle>
//           {this.state.isFavProfile ? `⭐️${title}⭐️` : title}
//         </CardTitle>
//       </CardWrapper>
//     )
//   }
// }
