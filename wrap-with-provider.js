import React from "react"
import { combineReducers, createStore } from "redux"
import { devToolsEnhancer } from "redux-devtools-extension"
import { Provider } from "react-redux"
import game, { initialState } from "./src/state/game"

const combinedReducers = combineReducers({ game })

export default ({ element }) => {
  const questions =
    typeof window !== "undefined" &&
    JSON.parse(sessionStorage.getItem("questions") || "[]")
  const indexQuestion =
    (typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("indexQuestion"))) ||
    0
  const question = questions[indexQuestion]
  const answers = question ? question.answers : []

  const persistedState = {
    game: {
      ...initialState,
      questions,
      indexQuestion,
      answers,
      question,
    },
  }

  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore(
    combinedReducers,
    persistedState,
    devToolsEnhancer()
  )

  return <Provider store={store}>{element}</Provider>
}
