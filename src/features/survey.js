import { createAction, createReducer } from '@reduxjs/toolkit'
import { selectSurvey } from '../utils/selectors'
import { answers } from '../utils/selectors'

const initialState = {
  answers: {},
  data: [],
  skills: [],
  status: 'void',
  error: null,
}

export const saveAnswer = createAction('survey/saveAnswer')
export const surveyFetching = createAction('survey/fetching')
export const surveyResolved = createAction('survey/resolved')
export const surveyRejected = createAction('survey/rejected')

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
  store.dispatch(surveyFetching())
  try {
    const url = FormatFetchSurvey(store)
    const response = await fetch(`http://localhost:8000/results/?${url}`)
    const data = await response.json()
    store.dispatch(surveyResolved(data.resultsData))
  } catch (error) {
    store.dispatch(surveyRejected(error))
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(saveAnswer, (draft, action) => {
      draft.answers = { ...draft.answers, ...action.payload }
      return
    })
    .addCase(surveyFetching, (draft, action) => {
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
    .addCase(surveyResolved, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.skills = []
        draft.data.map((skill) => draft.skills.push(skill.title.toUpperCase()))
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(surveyRejected, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = []
        draft.skills = []
        draft.status = 'rejected'
        return
      }
      return
    })
)
