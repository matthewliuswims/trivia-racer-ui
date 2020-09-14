import * as c from "./game_constants"

// @TODO: need to fix issue with putting correct answer always as the first option

const handlers = {
  [c.GAME_QUESTIONS_SET]: (state, action) => {
    const questions = action.questions.map(question => {
      const questionNew = { ...question }
      questionNew.correct_answer.animateState = "default"
      questionNew.incorrect_answers.forEach(answer => {
        answer.animateState = "default"
      })
      return questionNew
    })
    sessionStorage.setItem("questions", JSON.stringify(questions))
    const indexQuestion = "0"
    sessionStorage.setItem("indexQuestion", indexQuestion)
    // set the answers too
    const question = questions[state.indexQuestion]
    const answers = [question.correct_answer, ...question.incorrect_answers]
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
    const answers = newQuestion
      ? [newQuestion.correct_answer, ...newQuestion.incorrect_answers]
      : []
    return {
      ...state,
      question: newQuestion,
      indexQuestion: indexUpdated,
      answers,
    }
  },
}
export function reducer(state, action) {
  const handler = handlers[action.type]
  return handler ? handler(state, action) : state
}

export function init() {
  const questions = JSON.parse(sessionStorage.getItem("questions") || "[]")
  const indexQuestion = JSON.parse(sessionStorage.getItem("indexQuestion")) || 0
  const question = questions[indexQuestion] // will be undefined if out of index
  const answers = question
    ? [question.correct_answer, ...question.incorrect_answers]
    : []
  return {
    questions,
    question,
    answers,
    indexQuestion,
  }
}
