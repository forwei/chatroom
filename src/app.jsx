import React from 'react'
import UserList from './components/userlist'
import ChatList from './components/chatlist'
import Background from './components/background'
import Header from './components/header'
import ChatBox from './components/chatbox'
import InfoPanel from './components/infopanel'


export default class App extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			screenWidth: 0,
			screenHeight: 0
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
		window.addEventListener("resize", this.onWindowResize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onWindowResize.bind(this))
	}

	render() {
		if(!this.state.screenHeight || !this.state.screenWidth)
			return null

		return (
			<div style={{height: '100%', position: 'relative'}} >
				<Background />
				<Header />
				<div style={{position: 'absolute', left: 8, top: 58, bottom: 8, width: 220, overflow: 'hidden'}}>
					<InfoPanel />
					<UserList height={this.state.screenHeight - 50 - 16 - 260} />
				</div>
				<div style={{marginTop: 8, marginLeft: 236, marginBottom: 8, background: 'rgba(0, 0, 0, 0.2)', marginRight: 600}}>
					<ChatList height={this.state.screenHeight - 150 - 16 - 50} />
					<ChatBox />
				</div>
			</div>
		)
	}
}



