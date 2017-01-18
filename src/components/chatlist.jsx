import React from 'react'
import ScrollAuto from './scrollauto'

class ChatItem extends React.Component{

	render() {

		return(
			<div style={{position: 'relative', minHeight: 50}}>
				<div style={{position: 'absolute', top: 0, left: 0, width: 50}}>
					<img src="http://li.zhiboqiwang88.com/themes/v2/static/images/17yk.png" />
				</div>
				<div style={{marginLeft: 50, marginRight: 60}}>
					<div>
						{this.props.chat.name}
					</div>
					<div>
						{this.props.chat.content}
					</div>
				</div>
			</div>
		)
	}
}

export default class ChatList extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			chats:[
				{name: '江鸿波', content: 'chat content 什么更什么'},
				{name: '江鸿波1', content: 'chat content 什么更什么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么1'},
				{name: '江鸿波2', content: 'chat content 什么更什么2'},
				{name: '江鸿波3', content: 'chat content 什么更什么3'},
				{name: '江鸿波3', content: 'chat content 什么更什么3'},
				{name: '江鸿波3', content: 'chat content 什么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么3'},
				{name: '江鸿波3', content: 'chat content 什么更什么3'},
				{name: '江鸿波3', content: 'chat content 什么更什么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么更什么么3'}
			]
		}
	}

	addChat(event) {
		this.setState({chats: [...this.state.chats, {name: '江鸿波3', content: 'chat content 什么更什么3'}]})
	}

	render() {
		return(
			<div style={{color: '#fff', height: this.props.height}}>
				<div onClick={this.addChat.bind(this)} style={{height: 30}}>
					期望财经直播室，欢迎您
				</div>
				<div style={{height: this.props.height - 30}}>
				<ScrollAuto height={this.props.height - 30} autoBottom={true}>
					{this.state.chats.map((chat, inx) => {
						return <ChatItem key={inx} chat={chat} />
					})
					}
				</ScrollAuto>
				</div>
			</div>
		)
	}
}