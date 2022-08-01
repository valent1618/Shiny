import Survey from './'
import { render } from '../../utils/test'

describe('Survey', () => {
  it('should render without craching', async () => {
    render(<Survey />)
  })
})
