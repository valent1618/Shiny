// import { ThemeProvider } from './utils/context'
// import { SurveyProvider } from './utils/context'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyle from './utils/style/GlobalStyle'
import store from './utils/store'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

function MainRouter() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {/* <ThemeProvider> */}
          {/* <SurveyProvider> */}
          <GlobalStyle />
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/survey/:questionNumber" element={<Survey />} />
            <Route path="/results" element={<Results />} />
            <Route path="/freelances" element={<Freelances />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
          {/* </SurveyProvider> */}
          {/* </ThemeProvider> */}
        </Provider>
      </QueryClientProvider>
    </Router>
  )
}

export default MainRouter
