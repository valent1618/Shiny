import { profileFetching, profileResolved, profileRejected } from './profile'
import profileReducer from './profile'

describe('Profile actions', () => {
  it('Should create a fetching action objet', () => {
    expect(profileFetching()).toEqual({
      type: 'profile/fetching',
    })
  })
  it('Should create a resolved action objet', () => {
    expect(profileResolved()).toEqual({
      type: 'profile/resolved',
    })
  })
  it('Should create a rejected action objet', () => {
    expect(profileRejected()).toEqual({
      type: 'profile/rejected',
    })
  })
})

describe('Profile reducer', () => {
  it('should return the initial state when state is undefined', () => {
    expect(profileReducer(undefined, { type: '@INIT' })).toEqual({
      status: 'void',
      data: null,
      error: null,
    })
  })
  it('Should change the status', () => {
    expect(profileReducer({ status: 'void' }, profileFetching())).toEqual({
      status: 'pending',
    })
    expect(profileReducer({ status: 'rejected' }, profileFetching())).toEqual({
      error: null,
      status: 'pending',
    })
    expect(profileReducer({ status: 'resolved' }, profileFetching())).toEqual({
      status: 'updating',
    })
  })
  it('Should change the status and add data', () => {
    expect(
      profileReducer(
        { status: 'pending' },
        profileResolved({ name: 'Harry Potter', job: 'Sorcier' })
      )
    ).toEqual({
      data: { name: 'Harry Potter', job: 'Sorcier' },
      status: 'resolved',
    })
    expect(
      profileReducer(
        { status: 'updating' },
        profileResolved({ name: 'Harry Potter', job: 'Sorcier' })
      )
    ).toEqual({
      data: { name: 'Harry Potter', job: 'Sorcier' },
      status: 'resolved',
    })
  })
  it('Should change status add error and empty data', () => {
    expect(
      profileReducer({ status: 'pending' }, profileRejected('error'))
    ).toEqual({ error: 'error', data: [], status: 'rejected' })
    expect(
      profileReducer(
        {
          status: 'updating',
          error: '',
          data: { name: 'Harry Potter', job: 'Sorcier' },
        },
        profileRejected('error')
      )
    ).toEqual({ error: 'error', data: [], status: 'rejected' })
  })
  it('should return state on invalid action', () => {
    expect(profileReducer('test', { type: 'INVALID' })).toEqual('test')
  })
})
