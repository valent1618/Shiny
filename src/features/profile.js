import { createAction, createReducer } from '@reduxjs/toolkit'
import { selectProfile } from '../utils/selectors'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

export const profileFetching = createAction('profile/fetching')
export const profileResolved = createAction('profile/resolved')
export const profileRejected = createAction('profile/rejected')

export async function fetchOrUpdateProfile(store, id) {
  const status = selectProfile(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(profileFetching())
  try {
    const response = await fetch(`http://localhost:8000/freelance/?id=${id}`)
    const data = await response.json()
    store.dispatch(profileResolved(data.freelanceData))
  } catch (error) {
    store.dispatch(profileRejected(error))
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(profileFetching, (draft, action) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }
      if (draft.status === 'rejected') {
        draft.error = null
        draft.status = 'pending'
        return
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }
      return
    })
    .addCase(profileResolved, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(profileRejected, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = []
        draft.status = 'rejected'
        return
      }
      return
    })
)
