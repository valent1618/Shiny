//theme
export const darkMode = (state) => state.theme === 'dark'

// freelances
export const selectFreelances = (state) => state.freelances
export const dataFreelancesLoading = (state) =>
  state.freelances.status !== 'resolved' &&
  state.freelances.status !== 'rejected'

//survey
export const selectSurvey = (state) => state.survey
export const dataSurveyLoading = (state) =>
  state.survey.status !== 'resolved' && state.survey.status !== 'rejected'
export const answers = (state) => state.survey.answers
export const dataSurvey = (state) => state.survey.data

//profile
export const selectProfile = (state) => state.profile
export const dataProfileLoading = (state) =>
  state.profile.status !== 'resolved' && state.profile.status !== 'rejected'
