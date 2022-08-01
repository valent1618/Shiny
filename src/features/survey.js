import { createSlice } from '@reduxjs/toolkit'
import { selectSurvey, answers } from '../utils/selectors'

const { actions, reducer } = createSlice({
  name: 'survey',
  initialState: {
    answers: {},
    data: [],
    skills: [],
    status: 'void',
    error: null,
  },
  reducers: {
    saveAnswer: (state, action) => {
      state.answers = { ...state.answers, ...action.payload }
      return
    },
    fetching: (state) => {
      switch (state.status) {
        case 'void':
          state.status = 'pending'
          return
        case 'rejected':
          state.error = null
          state.status = 'pending'
          return
        case 'resolved':
          state.status = 'updating'
          return
        default:
          return
      }
    },
    resolved: (state, action) => {
      if (state.status === 'pending' || state.status === 'updating') {
        state.data = action.payload
        state.skills = []
        state.data.map((skill) => state.skills.push(skill.title.toUpperCase()))
        state.status = 'resolved'
        return
      }
      return
    },
    rejected: (state, action) => {
      if (state.status === 'pending' || state.status === 'updating') {
        state.error = action.payload
        state.data = []
        state.skills = []
        state.status = 'rejected'
        return
      }
      return
    },
  },
})

export const { saveAnswer, fetching, resolved, rejected } = actions
export default reducer

function FormatFetchSurvey(store) {
  const answersResult = answers(store.getState())
  let url = ''
  for (let i = 1; i < 7; i++) {
    if (answersResult[i]) {
      url += `a${i}=true&`
    }
  }
  return url
}

export async function fetchSurveyData(store) {
  const status = selectSurvey(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(fetching())
  try {
    const url = FormatFetchSurvey(store)
    const response = await fetch(`http://localhost:8000/results/?${url}`)
    const data = await response.json()
    store.dispatch(resolved(data.resultsData))
  } catch (error) {
    store.dispatch(rejected(error))
  }
}
