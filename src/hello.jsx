import React from 'react'
import UserList from './components/userlist'
import ChatList from './components/chatlist'


export default class Hello extends React.Component{
	render() {
		return (
			<div>
			<ChatList />
			<UserList height="450" />
			</div>
		)
	}
}



