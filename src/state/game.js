import * as c from "./game_constants"

export const initialState = {
  questions: [],
  question: undefined,
  indexQuestion: 0,
  answers: [],
  score: 0,
  questionsAnswered: [],
}

const handlers = {
  [c.GAME_QUESTIONS_SET]: (_, action) => {
    const questions = action.questions.map(question => {
      const answers = question.answers.map(answer => ({
        ...answer,
        animateState: "default",
        chosen: false,
      }))

      return {
        ...question,
        answers,
      }
    })

    // set the answers too
    const question = questions[initialState.indexQuestion]
    const answers = question.answers

    return {
      ...initialState,
      questions,
      answers,
      question,
    }
  },
  [c.GAME_ANSWER_CHOICE]: (state, action) => {
    const { correctID, questionID, chosenID } = action
    const scoreUpdated =
      chosenID === correctID
        ? state.score + 1
        : state.score === 0
        ? 0
        : state.score - 1

    const answersAnimated = state.answers.map(answer => {
      // always show the correct answer
      if (answer.id === correctID) {
        return {
          ...answer,
          chosen: chosenID === answer.id,
          animateState: "correct",
        }
      }
      // incorrect answer was chosen
      if (answer.id === chosenID) {
        return {
          ...answer,
          chosen: chosenID === answer.id,
          animateState: "incorrect",
        }
      }
      return {
        ...answer,
        animateState: "unchosen",
      }
    })

    const questionsAnswered = [
      ...state.questionsAnswered,
      { questionID, answerID: chosenID },
    ]

    return {
      ...state,
      answers: answersAnimated,
      score: scoreUpdated,
      questionsAnswered,
    }
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

  [c.GAME_RESET]: () => {
    return initialState
  },
}

export const selectScore = ({ game }) => game.score
export const selectQuestion = ({ game }) => game.question
export const selectQuestions = ({ game }) => game.questions
export const selectQuestionsAnswered = ({ game }) => game.questionsAnswered
export const selectAnswers = ({ game }) => game.answers
export const selectIndexQuestion = ({ game }) => game.indexQuestion

function reducer(state = initialState, action) {
  const handler = handlers[action.type]
  return handler ? handler(state, action) : state
}

export default reducer
