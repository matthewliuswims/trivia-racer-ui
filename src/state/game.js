import * as c from "./game_constants"

// @TODO: need to fix issue with putting correct answer always as the first option

export function reducer(state, action) {
  switch (action.type) {
    case c.GAME_QUESTIONS_SET:
      const questions = action.questions.map(question => {
        const questionNew = { ...question }
        questionNew.correct_answer.animateState = "default"
        questionNew.incorrect_answers.forEach(answer => {
          answer.animateState = "default"
        })
        return questionNew
      })
      sessionStorage.setItem("questions", JSON.stringify(questions))
      // set the answers too
      const question = questions[state.indexQuestion]
      const answers = [question.correct_answer, ...question.incorrect_answers]
      return { ...state, questions, answers, question }

    case c.GAME_ANSWER_CORRECT:
      const correctID = action.correctID
      const indexUpdated = state.indexQuestion + 1
      // update sessionStorage, but don't update index state (quite yet)
      sessionStorage.setItem("indexQuestion", JSON.stringify(indexUpdated))
      const updatedAnswers = state.answers.map(answer => {
        if (answer.id === correctID) {
          return {
            ...answer,
            animateState: "correct",
          }
        }
        return answer
      })
      return { ...state, answers: updatedAnswers }

    case c.GAME_QUESTION_NEW:
      const newQuestion = state.questions[state.indexQuestion]
      if (!newQuestion) {
        console.log("@TODO handle this edge case when all questions are done")
      }
      return {
        ...state,
        question: newQuestion,
        indexQuestion: state.indexQuestion + 1,
        answers: [newQuestion.correct_answer, ...newQuestion.incorrect_answers],
      }
    default:
      return state
  }
}
