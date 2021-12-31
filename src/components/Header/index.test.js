import Header from './'
import { render } from '../../utils/test'

describe('Header', () => {
  it('should render without craching', async () => {
    render(<Header />)
  })
})
