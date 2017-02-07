import React from 'react'
import ScrollAuto from './scrollauto'
import Dialog from './dialog'

import { connect } from 'react-redux'

class ChatItem extends React.Component{

	render() {

		return(
			<div style={{position: 'relative', minHeight: 50, padding: '4px 0'}}>
				<div style={{position: 'absolute', top: 0, left: 0, width: 50}}>
					<img src="http://li.zhiboqiwang88.com/themes/v2/static/images/17yk.png" />
				</div>
				<div style={{margin: '0px 60px 0px 50px'}}>
					<div style={{height: 30, lineHeight: '30px'}}>
						{this.props.chat.name}
					</div>
					<div style={{display: 'inline-block', color: '#333', backgroundColor: '#fff', padding: 3, borderRadius: 3}}>
						{this.props.chat.content}
					</div>
				</div>
			</div>
		)
	}
}

class ChatList extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	addChat(event) {
		this.setState({open: !this.state.open})
	}

	handleClose() {
		this.setState({...this.state, open: false})
	}

	render() {

		return(
			<div style={{color: '#fff', height: this.props.height}}>
				<div onClick={this.addChat.bind(this)} style={{height: 30}}>
					期望财经直播室，欢迎您
				</div>
				<div style={{height: this.props.height - 30}}>
				<ScrollAuto height={this.props.height - 30} autoBottom={true}>
					{this.props.messages.map((chat, inx) => {
						return <ChatItem key={inx} chat={chat} />
					})
					}
				</ScrollAuto>
				</div>
				{this.state.open &&
					<Dialog height={200} width={550} onClose={this.handleClose.bind(this)}>
						<p style={{background: '#fff'}}>对话dfgdf<br />框</p>
					</Dialog>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {

	return {
		messages: state.message
	}
}

export default connect(mapStateToProps)(ChatList)