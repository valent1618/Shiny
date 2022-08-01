import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'
import store from './utils/store'
import GlobalStyle from './utils/style/GlobalStyle'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Profile from './pages/Profile'
import Error from './components/Error'

const queryClient = new QueryClient()

function MainRouter() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
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
        </Provider>
      </QueryClientProvider>
    </Router>
  )
}

export default MainRouter
