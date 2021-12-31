// import { createContext, useState } from 'react'

// export const ThemeContext = createContext()

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light')
//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light')
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// export const SurveyContext = createContext()

// export const SurveyProvider = ({ children }) => {
//   const [answers, setAnswers] = useState({})
//   const saveAnswers = (newAnswers) => {
//     setAnswers({ ...answers, ...newAnswers })
//   }

//   const skills = []
//   const AddSkills = () => {
//     let foundTrue = false
//     for (let i = 1; i < 7; i++) {
//       if (answers[i] === true) {
//         foundTrue = true
//       }
//     }
//     foundTrue &&
//       skills.push('Développeur frontend')(
//         answers[1] === true || answers[4] === true || answers[5] === true
//       ) &&
//       skills.push('Développeur backend ou fullstack')
//     answers[2] === true && skills.push('Intégrateur SEO')
//     answers[3] === true && skills.push('UX Design')
//     answers[6] === true && skills.push('Développeur mobile')
//   }

//   return (
//     <SurveyContext.Provider value={{ answers, saveAnswers, skills, AddSkills }}>
//       {children}
//     </SurveyContext.Provider>
//   )
// }
