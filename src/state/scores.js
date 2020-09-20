import * as c from "./scores_constants"

export const initialState = {
  scoresTop: [],
  scoresRecent: [],
}

const handlers = {
  [c.SCORES_TOP_SET]: (state, action) => {
    return {
      ...state,
      scoresTop: action.scoresTop,
    }
  },
  [c.SCORES_RECENT_SET]: (state, action) => {
    return {
      ...state,
      scoresRecent: action.scoresRecent,
    }
  },
}

export const selectScoresTop = ({ scores }) => scores.scoresTop
export const selectScoresRecent = ({ scores }) => scores.scoresRecent

function reducer(state = initialState, action) {
  const handler = handlers[action.type]
  return handler ? handler(state, action) : state
}

export default reducer
