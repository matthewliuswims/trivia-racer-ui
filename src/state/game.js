import * as c from "./game_constants"

export const initialState = {
  questions: [],
  question: undefined,
  indexQuestion: 0,
  answers: [],
}

const handlers = {
  [c.GAME_QUESTIONS_SET]: (state, action) => {
    const questions = action.questions.map(question => {
      const answers = question.answers.map(answer => ({
        ...answer,
        animateState: "default",
      }))

      return {
        ...question,
        answers,
      }
    })

    sessionStorage.setItem("questions", JSON.stringify(questions))

    const indexQuestion = 0
    sessionStorage.setItem("indexQuestion", JSON.stringify(indexQuestion))

    // set the answers too
    const question = questions[indexQuestion]

    const answers = question ? question.answers : []
    return { ...state, questions, answers, question, indexQuestion }
  },
  [c.GAME_ANSWER_CORRECT]: (state, action) => {
    const { correctID } = action
    const indexUpdated = state.indexQuestion + 1

    // update sessionStorage, but don't update index state (quite yet)
    sessionStorage.setItem("indexQuestion", JSON.stringify(indexUpdated))

    const answersAnimated = state.answers.map(answer => {
      if (answer.id === correctID) {
        return {
          ...answer,
          animateState: "correct",
        }
      }
      return {
        ...answer,
        animateState: "unchosen",
      }
    })

    return { ...state, answers: answersAnimated }
  },

  [c.GAME_QUESTION_NEW]: state => {
    const indexUpdated = state.indexQuestion + 1
    const newQuestion = state.questions[indexUpdated]
    const answers = newQuestion ? newQuestion.answers : []

    return {
      ...state,
      question: newQuestion,
      indexQuestion: indexUpdated,
      answers,
    }
  },
}

export const selectQuestion = ({ game }) => game.question
export const selectQuestions = ({ game }) => game.questions
export const selectAnswers = ({ game }) => game.answers
export const selectIndexQuestion = ({ game }) => game.indexQuestion

function reducer(state = initialState, action) {
  const handler = handlers[action.type]
  return handler ? handler(state, action) : state
}

export default reducer
