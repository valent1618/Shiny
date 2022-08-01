import Home from './'
import { render } from '../../utils/test'

describe('Home', () => {
  it('should render without craching', async () => {
    render(<Home />)
  })
})
