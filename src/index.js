import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import { Provider } from 'react-redux'
import store from './reducers/store'

//初始化websocket
import './libs/chatroom'


ReactDOM.render(<Provider store={store}>
									<App />
								</Provider>,
								document.getElementById("app"));
