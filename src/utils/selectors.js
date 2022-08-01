//theme
export const darkMode = (state) => state.theme === 'dark'

//survey
export const selectSurvey = (state) => state.survey
export const dataSurveyLoading = (state) =>
  state.survey.status !== 'resolved' && state.survey.status !== 'rejected'
export const answers = (state) => state.survey.answers
export const dataSurvey = (state) => state.survey.data
