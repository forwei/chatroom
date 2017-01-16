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

	render() {

		const styles = getStyles(this.state)

		return (
			<div 
			onMouseLeave={this.handleMouseLeave.bind(this)}
			onMouseEnter={this.handleMouseEnter.bind(this)}
			style={styles.item}>
			<span>游客{this.props.name}</span></div>
		)
	}
}

export default class UserList extends React.Component{
	constructor(props) {
		super(props)

  }
	render() {

		const styles = getStyles()

		return (
			<div id="userlist" style={styles.root}>
				<div style={styles.headwrap}>
					<span>在线会员</span>
				</div>
				<div>
					<input type="text" style={styles.searchbtn} />
					<span>在线</span>
				</div>
				<div style={{height: 200, overflow: 'hidden'}}>
					<ScrollArea itemHeight={24} height={200}>
					<UserItem name="1" />
					<UserItem name="2" />
					<UserItem name="3" />
					<UserItem name="4" />
					<UserItem name="5" />
					<UserItem name="6" />
					<UserItem name="7" />
					<UserItem name="8" />
					<UserItem name="9" />
					<UserItem name="10" />
					<UserItem name="11" />
					<UserItem name="12" />
					<UserItem name="13" />
					<UserItem name="14" />
					<UserItem name="15" />
					<UserItem name="16" />
					<UserItem name="17" />
					<UserItem name="18" />
					<UserItem name="19" />
					<UserItem name="20" />
					<UserItem name="21" />
					<UserItem name="22" />
					<UserItem name="23" />
					<UserItem name="24" />
					<UserItem name="25" />
					<UserItem name="26" />
					<UserItem name="27" />
					<UserItem name="28" />
					<UserItem name="29" />
					<UserItem name="30" />
					<UserItem name="31" />
					<UserItem name="32" />
					<UserItem name="33" />
					<UserItem name="34" />
					<UserItem name="35" />
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