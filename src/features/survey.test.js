import { surveyFetching, surveyResolved, surveyRejected } from './survey'
import surveyReducer from './survey'

describe('Survey actions', () => {
  it('Should create a fetching action objet', () => {
    expect(surveyFetching()).toEqual({
      type: 'survey/fetching',
    })
  })
  it('Should create a resolved action objet', () => {
    expect(surveyResolved()).toEqual({
      type: 'survey/resolved',
    })
  })
  it('Should create a rejected action objet', () => {
    expect(surveyRejected()).toEqual({
      type: 'survey/rejected',
    })
  })
})

describe('Survey reducer', () => {
  it('should return the initial state when state is undefined', () => {
    expect(surveyReducer(undefined, { type: '@INIT' })).toEqual({
      answers: {},
      data: [],
      skills: [],
      status: 'void',
      error: null,
    })
  })
  it('Should change the status', () => {
    expect(surveyReducer({ status: 'void' }, surveyFetching())).toEqual({
      status: 'pending',
    })
    expect(surveyReducer({ status: 'rejected' }, surveyFetching())).toEqual({
      error: null,
      status: 'pending',
    })
    expect(surveyReducer({ status: 'resolved' }, surveyFetching())).toEqual({
      status: 'updating',
    })
  })
  it('Should change the status, add data and add skills in MAJ', () => {
    expect(
      surveyReducer(
        { status: 'pending' },
        surveyResolved([{ name: 'Harry Potter', title: 'Sorcier' }])
      )
    ).toEqual({
      data: [{ name: 'Harry Potter', title: 'Sorcier' }],
      skills: ['SORCIER'],
      status: 'resolved',
    })
    expect(
      surveyReducer(
        { status: 'updating' },
        surveyResolved([
          { name: 'Harry Potter', title: 'Sorcier' },
          { name: 'Hermione Granger', title: 'Magicienne' },
        ])
      )
    ).toEqual({
      data: [
        { name: 'Harry Potter', title: 'Sorcier' },
        { name: 'Hermione Granger', title: 'Magicienne' },
      ],
      skills: ['SORCIER', 'MAGICIENNE'],
      status: 'resolved',
    })
  })
  it('Should change status add error and empty data', () => {
    expect(
      surveyReducer({ status: 'pending' }, surveyRejected('error'))
    ).toEqual({ error: 'error', data: [], skills: [], status: 'rejected' })
    expect(
      surveyReducer(
        {
          status: 'updating',
          error: '',
          data: { name: 'Harry Potter', job: 'Sorcier' },
        },
        surveyRejected('error')
      )
    ).toEqual({ error: 'error', data: [], skills: [], status: 'rejected' })
  })
  it('should return state on invalid action', () => {
    expect(surveyReducer('test', { type: 'INVALID' })).toEqual('test')
  })
})
