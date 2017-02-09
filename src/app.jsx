import React from 'react'
import UserList from './components/userlist'
import ChatList from './components/chatlist'
import Background from './components/background'
import Header from './components/header'
import ChatBox from './components/chatbox'
import InfoPanel from './components/infopanel'
import DragBar from './components/dragbar'


export default class App extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			screenWidth: 0,
			screenHeight: 0,
			chatWidth: 550
		}
		this.onWindowResize = this.onWindowResize.bind(this)

		if(localStorage && localStorage.hasOwnProperty('chatWidth')){
				this.state.chatWidth = parseInt(localStorage.getItem('chatWidth'))
		}
	}

	onWindowResize(event) {
		let documentElement = document.documentElement, body = document.getElementsByTagName('body')[0]

		let width = window.innerWidth || documentElement.clientWidth || body.clientWidth
		let height = window.innerHeight|| documentElement.clientHeight|| body.clientHeight
		if(height != this.state.screenHeight || width != this.state.screenWidth){
			this.setState({...this.state, screenWidth: width, screenHeight: height})
		}
	}

	componentDidMount() {
		this.onWindowResize()
		window.addEventListener("resize", this.onWindowResize)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onWindowResize)
	}

	handleDrag(x) {
		if((this.state.chatWidth < 400 && x > 0) || (this.state.chatWidth > 800 && x < 0))
			return
		if(localStorage){
			localStorage.setItem('chatWidth', this.state.chatWidth - x)
		}
		this.setState({...this.state, chatWidth: this.state.chatWidth - x})
	}

	render() {
		if(!this.state.screenHeight || !this.state.screenWidth)
			return null

		return (
			<div style={{height: '100%', position: 'relative', overflow: 'hidden'}} >
				<Background />
				<Header />
				<div style={{position: 'absolute', left: 8, top: 58, bottom: 8, width: 220, overflow: 'hidden'}}>
					<InfoPanel />
					<UserList height={this.state.screenHeight - 50 - 16 - 260} />
				</div>
				<div style={{marginTop: 8, marginLeft: 236, marginBottom: 8, background: 'rgba(0, 0, 0, 0.2)', marginRight: this.state.chatWidth, height: this.state.screenHeight - 50 - 16}}>

				</div>

				<DragBar style={{width: 8, height: this.state.screenHeight - 50 - 16, position: 'absolute', top: 58, right: this.state.chatWidth - 8, cursor: 'e-resize', userSelect: 'none', transition: 'background-color 300ms'}} onDrag={this.handleDrag.bind(this)} />

				<div style={{width: this.state.chatWidth - 16, top: 58, right: 8, height: this.state.screenHeight - 50 - 16, position: 'absolute', background: 'rgba(0, 0, 0, 0.2)'}}>
					<ChatList height={this.state.screenHeight - 150 - 16 - 50} />
					<ChatBox />
				</div>
			</div>
		)
	}
}



