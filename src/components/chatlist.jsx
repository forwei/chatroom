import React from 'react'
import ScrollAuto from './scrollauto'

import { connect } from 'react-redux'

class ChatItem extends React.Component{

	render() {

		let faceStyle = {position: 'absolute', top: 9, left: 0, width: 50, textAlign: 'center'}
		let wrapStyle = {margin: '0px 60px 0px 50px'}
		let contentStyle = {display: 'inline-block', color: '#333', backgroundColor: '#fff', padding: '3px 6px', borderRadius: 3, lineHeight: '30px'}

		if(this.props.account.userId == this.props.chat.userId){
			faceStyle.left = 'auto'
			faceStyle.right = 0
			wrapStyle.marginRight = 50
			wrapStyle.marginLeft = 60
			wrapStyle.textAlign = 'right'
			contentStyle.textAlign = 'left'
		}

		return(
			<div style={{position: 'relative', minHeight: 50, padding: '4px 0'}}>
				<div style={faceStyle}>
					<img src="http://li.zhiboqiwang88.com/themes/v2/static/images/17yk.png" />
				</div>
				<div style={wrapStyle}>
					<div style={{height: 30, lineHeight: '30px'}}>
						{this.props.chat.userId > 0 ? this.props.chat.name : '游客' + this.props.chat.name}
					</div>
					<div style={contentStyle} dangerouslySetInnerHTML={{__html: this.props.chat.content}} />
				</div>
			</div>
		)
	}
}

class ChatList extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	render() {

		return(
			<div style={{color: '#fff', height: this.props.height}}>
				<div style={{height: 30}}>
					期望财经直播室，欢迎您
				</div>
				<div style={{height: this.props.height - 30}}>
				<ScrollAuto height={this.props.height - 30} autoBottom={true}>
					{this.props.messages.map((chat, inx) => {
						return <ChatItem key={inx} chat={chat} account={this.props.account} />
					})
					}
				</ScrollAuto>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {

	return {
		messages: state.message,
		account: state.account
	}
}

export default connect(mapStateToProps)(ChatList)