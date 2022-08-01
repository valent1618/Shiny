import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import themeReducer from '../../features/theme'
import surveyReducer from '../../features/survey'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()

export function render(ui, options) {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
      survey: surveyReducer,
    },
  })

  function Wrapper({ children }) {
    return (
      <MemoryRouter {...options}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </MemoryRouter>
    )
  }
  rtlRender(ui, { wrapper: Wrapper })
}
