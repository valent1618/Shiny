import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    toggle: (state) => {
      return state === 'light' ? 'dark' : 'light'
    },
    set: (state, action) => {
      return action.payload
    },
  },
})

export const { toggle, set } = actions

export default reducer

// import {createAction, createReducer} from '@reduxjs/toolkit'

// export const toggleTheme = createAction('theme/toggle')
// export const setTheme = createAction('theme/set')

// export default createReducer('light', (builder) =>
//   builder
//     .addCase(toggleTheme, (state) => {
//       return state === 'light' ? 'dark' : 'light'
//     })
//     .addCase(setTheme, (state, action) => {
//       return action.payload
//     })
// )
