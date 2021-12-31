import { selectFreelances } from '../utils/selectors'
import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

export const freelancesFetching = createAction('freelances/fetching')
export const freelancesResolved = createAction('freelances/resolved')
export const freelancesRejected = createAction('freelances/rejected')

export function FormatCategory(job) {
  job = job.split(' ')
  if (job.length > 1) {
    return job[1].toUpperCase()
  } else {
    return job[0].toUpperCase()
  }
}

export async function fetchOrUpdateFreelances(store) {
  const status = selectFreelances(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(freelancesFetching())
  try {
    const response = await fetch('http://localhost:8000/freelances')
    const data = await response.json()
    data.freelancersList.map(
      (profile) => (profile.category = FormatCategory(profile.job))
    )
    store.dispatch(freelancesResolved(data.freelancersList))
  } catch (error) {
    store.dispatch(freelancesRejected(error))
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(freelancesFetching, (draft, action) => {
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
    .addCase(freelancesResolved, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(freelancesRejected, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = []
        draft.status = 'rejected'
        return
      }
      return
    })
)
