import React from 'react'
import ReactDOM from "react-dom"

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
			<span>游客98206128</span></div>
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
				<div>
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
					<UserItem />
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