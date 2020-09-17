import React from "react"
import { combineReducers, createStore } from "redux"
import { devToolsEnhancer } from "redux-devtools-extension"
import { Provider } from "react-redux"
import game from "./src/state/game"

const combinedReducers = combineReducers({ game })

export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore(combinedReducers, devToolsEnhancer())

  return <Provider store={store}>{element}</Provider>
}
