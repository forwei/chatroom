import React from 'react'
import ReactDOM from "react-dom"
import ScrollArea from './scrollarea'

class UserItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hovered: false
		}
  }

	handleMouseLeave(event) {
		this.setState({hovered: false})
	}

	handleMouseEnter(event) {
		this.setState({hovered: true})
	}

	handleClick(event){
		this.props.onClick(this.props.inx)
	}

	render() {

		const styles = getStyles(this.state)

		return (
			<div 
			onMouseLeave={this.handleMouseLeave.bind(this)}
			onMouseEnter={this.handleMouseEnter.bind(this)}
			onClick={this.handleClick.bind(this)}
			style={styles.item}>
			<span>游客{this.props.name}</span></div>
		)
	}
}

export default class UserList extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			users: []
		}
  }

  addUser(event) {
  	if(this.refs.val.value)
  		this.setState({users: [...this.state.users, this.refs.val.value]})
  }

  removeUser(inx){
  	this.state.users.splice(inx, 1)
  	this.setState(this.state)
  }

	render() {

		const styles = getStyles()

		return (
			<div id="userlist" style={styles.root}>
				<div style={styles.headwrap}>
					<span>在线会员</span>
				</div>
				<div>
					<input ref="val" type="text" style={styles.searchbtn} />
					<span onClick={this.addUser.bind(this)}>在线</span>
				</div>
				<div style={{height: 200, overflow: 'hidden'}}>
					<ScrollArea itemHeight={24} height={200}>
					{
						this.state.users.map((user, inx) => {
							return <UserItem key={inx} name={user} inx={inx} onClick={this.removeUser.bind(this)} />
						})
					}
					</ScrollArea>
				</div>
			</div>
		)
	}
	componentDidMount() {

  }
}

function getStyles(state) {
	return {
		root: {
			width: 250,
			background: 'rgba(0, 0, 0, 0.2)',
			color: '#fff'
		},
		item: {
			cursor: 'pointer',
			transition: 'background-color 300ms',
			background: state && state.hovered ? 'rgba(0, 0, 0, 0.2)' : null
		},
		headwrap: {
			borderBottom: 'rgba(255,255,255,0.3) 1px solid',
			height: 31,
			lineHeight: '31px',
			paddingLeft: 5
		},
		searchbtn: {
			border: 'none',
			background: 'rgba(0,0,0,0.3)',
			padding: '4px 5px',
			marginLeft: '5px',
			color: '#fff'
		}
	}
}