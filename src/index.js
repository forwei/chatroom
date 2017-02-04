import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

//初始化websocket
import './libs/chatroom'

const middleware = [ thunk ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)


ReactDOM.render(<Provider store={store}>
									<App />
								</Provider>,
								document.getElementById("app"));
