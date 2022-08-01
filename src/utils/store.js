import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme'
import surveyReducer from '../features/survey'

export default configureStore({
  reducer: {
    theme: themeReducer,
    survey: surveyReducer,
  },
})
