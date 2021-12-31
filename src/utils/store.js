import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme'
import surveyReducer from '../features/survey'
import freelancesReducer from '../features/freelances'
import profileReducer from '../features/profile'

export default configureStore({
  reducer: {
    theme: themeReducer,
    survey: surveyReducer,
    freelances: freelancesReducer,
    profile: profileReducer,
  },
})

// const reducer = combineReducers({
//   theme: themeReducer,
//   survey: surveyReducer,
//   freelances: freelancesReducer,
//   profile: profileReducer,
// })

// const reduxDevtools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// const store = createStore(reducer, reduxDevtools)

// export default store
