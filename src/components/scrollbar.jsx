import React from 'react'
import ReactDOM from "react-dom"


export default class ScrollBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false
		}
		this.barHeight = 0
		this.barMargin = 0
	}

	handleParentOver(event) {
		if(this.state.show || this.props.containerHeight < this.props.height)
			return
		this.setState({show: true})
	}

	handleParentOut(event) {
		if(this.state.show)
			this.setState({show: false})
	}

	componentWillUpdate(nextProps, nextState) {
		let bili = nextProps.containerHeight / nextProps.height
		this.barHeight = nextProps.height / bili
		if(this.barHeight > nextProps.height) {
			this.barHeight = 0
		}else
			this.barMargin = Math.abs(nextProps.scrollTop) / bili
	}

	componentDidMount() {
		let parent = ReactDOM.findDOMNode(this).parentNode
		parent.addEventListener('mouseover', this.handleParentOver.bind(this))
		parent.addEventListener('mouseout', this.handleParentOut.bind(this))
	}

	componentWillUnmount() {
		let parent = ReactDOM.findDOMNode(this).parentNode
		parent.removeEventListener('mouseover', this.handleParentOver.bind(this))
		parent.removeEventListener('mouseout', this.handleParentOut.bind(this))
	}

	render() {

		return(
			<div style={{'marginRight': this.state.show ? 0 : -5, position: 'absolute', right: 0, top: 0, bottom: 0, width: 5, background: 'rgba(0,0,0,.1)', borderRadius: 5, transition: 'margin-right 200ms'}}>
				<div style={{height: this.barHeight, background: 'rgba(0,0,0,.1)', marginTop: this.barMargin, transition: 'margin-top 300ms', borderRadius: 5}} />
			</div>
		)
	}
}