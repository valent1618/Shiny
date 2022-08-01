import Profile from './'
import { render } from '../../utils/test'

describe('Profile', () => {
  it('should render without craching', async () => {
    render(<Profile />)
  })
})
