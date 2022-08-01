import { SkillsFormat } from './'
import Result from './'
import { render } from '../../utils/test'

describe('Result', () => {
  it('should render without craching', async () => {
    render(<Result />)
  })
})

describe('The function SkillsFormat', () => {
  it('should add a space before and a comma after the word', () => {
    expect(SkillsFormat('Développeur', 5, 3)).toBe(' Développeur,')
  })
  it('should add a space before and a point after the word', () => {
    expect(SkillsFormat('Ingénieur', 5, 4)).toBe(' Ingénieur.')
  })
})
