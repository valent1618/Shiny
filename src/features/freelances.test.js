import {
  freelancesFetching,
  freelancesResolved,
  freelancesRejected,
  FormatCategory,
} from './freelances'
import freelancesReducer from './freelances'

describe('Function FormatCategory', () => {
  it('Should return the word in MAJ or the second word in MAJ', () => {
    expect(FormatCategory('magicien')).toBe('MAGICIEN')
    expect(FormatCategory('expert magicien')).toBe('MAGICIEN')
  })
})

describe('Freelances actions', () => {
  it('Should create a fetching action objet', () => {
    expect(freelancesFetching()).toEqual({
      type: 'freelances/fetching',
    })
  })
  it('Should create a resolved action objet', () => {
    expect(freelancesResolved()).toEqual({
      type: 'freelances/resolved',
    })
  })
  it('Should create a rejected action objet', () => {
    expect(freelancesRejected()).toEqual({
      type: 'freelances/rejected',
    })
  })
})

describe('Freelances reducer', () => {
  it('should return the initial state when state is undefined', () => {
    expect(freelancesReducer(undefined, { type: '@INIT' })).toEqual({
      status: 'void',
      data: null,
      error: null,
    })
  })
  it('Should change the status', () => {
    expect(freelancesReducer({ status: 'void' }, freelancesFetching())).toEqual(
      { status: 'pending' }
    )
    expect(
      freelancesReducer({ status: 'rejected' }, freelancesFetching())
    ).toEqual({ error: null, status: 'pending' })
    expect(
      freelancesReducer({ status: 'resolved' }, freelancesFetching())
    ).toEqual({ status: 'updating' })
  })
  it('Should change the status and add data', () => {
    expect(
      freelancesReducer(
        { status: 'pending' },
        freelancesResolved({ name: 'Harry Potter', job: 'Sorcier' })
      )
    ).toEqual({
      data: { name: 'Harry Potter', job: 'Sorcier' },
      status: 'resolved',
    })
    expect(
      freelancesReducer(
        { status: 'updating' },
        freelancesResolved({ name: 'Harry Potter', job: 'Sorcier' })
      )
    ).toEqual({
      data: { name: 'Harry Potter', job: 'Sorcier' },
      status: 'resolved',
    })
  })
  it('Should change status add error and empty data', () => {
    expect(
      freelancesReducer({ status: 'pending' }, freelancesRejected('error'))
    ).toEqual({ error: 'error', data: [], status: 'rejected' })
    expect(
      freelancesReducer(
        {
          status: 'updating',
          error: '',
          data: { name: 'Harry Potter', job: 'Sorcier' },
        },
        freelancesRejected('error')
      )
    ).toEqual({ error: 'error', data: [], status: 'rejected' })
  })
  it('should return state on invalid action', () => {
    expect(freelancesReducer('test', { type: 'INVALID' })).toEqual('test')
  })
})
