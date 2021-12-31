import Error from './'
import { render } from '../../utils/test'

describe('Error', () => {
  it('should render without craching', async () => {
    render(<Error />)
  })
})
