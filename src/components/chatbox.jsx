import React from 'react'
import { connect } from 'react-redux'

import {postMessage} from '../actions/message'
import Emotion from './emotion'

class ChatBox extends React.Component {

	handlePostMsg() {
		let messageText = this.refs.messageText.value
		if(messageText.length < 1)
			return
		messageText = {content: messageText, msgType: 1}
		this.props.dispatch(postMessage(messageText))

		this.refs.messageText.value = ''
	}

	handleKeyEnter(e) {
		if(e.key === 'Enter'){
			this.handlePostMsg()
			e.preventDefault()
		}
	}

	handleSelectFace(name) {
		this.refs.messageText.value = this.refs.messageText.value + name
		this.refs.messageText.focus()
	}

	render() {

		return(
			<div style={{height: 150, backgroundColor: '#FFF'}}>
				<div style={{height: 35, lineHeight: '35px', padding: 8}}>
					高级客服：
				</div>
				<div style={{height: 37, lineHeight: '37px', backgroundColor: 'rgb(243,243,243)', padding: '0 8px'}}>
					<Emotion style={{display: 'inline-block', cursor: 'pointer'}} selectFace={this.handleSelectFace.bind(this)}>表情 </Emotion><span> 图片</span>
				</div>
				<div style={{height: 62, position: 'relative', paddingRight: 120}}>
					<input type="text" style={{display: 'block', border: 'none', height: '100%', padding: '0px 10px', width: '100%', fontSize: 18, outline: 'none'}} placeholder="在这儿说点什么。。。" ref="messageText" onKeyPress={this.handleKeyEnter.bind(this)}/>
					<a style={{position: 'absolute', top: 0, right: 0, width: 100, height: 62, textAlign: 'center', lineHeight: '62px', background: '#ccc', fontSize: 20}} href="javascript:;" onClick={this.handlePostMsg.bind(this)}>发 送</a>
				</div>
			</div>
		)
	}
}

export default connect()(ChatBox)