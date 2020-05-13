import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import commentReducer from './reducers/commentReducer'
import blogVis from './reducers/blogVis'

const reducer = combineReducers({
    blogs: blogReducer,
    users: userReducer,
    user: loginReducer,
    notification: notificationReducer,
    comments: commentReducer,
    visib: blogVis
})

const store = createStore(reducer,
    
    composeWithDevTools(applyMiddleware(thunk))
)

export default store