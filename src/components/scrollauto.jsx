import React from 'react'
import ReactDOM from "react-dom"
import ScrollBar from './scrollbar'


export default class ScrollAuto extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scrollTop: 0,
			containerHeight: 0
		}
		this.scrolling = false
		this.contentNode = null
	}

	handleWheel(event) {
    let deltaY = event.deltaY, scrollTop = this.state.scrollTop

		event.preventDefault()
    event.stopPropagation()

    if(this.state.containerHeight < this.props.height)
    	return
		
    scrollTop -= deltaY
    if(scrollTop > 0)
    	scrollTop = 0

    this.scrolling = true

    let maxBottom = this.state.containerHeight - this.props.height

    if(scrollTop < -maxBottom){
    	scrollTop = -maxBottom
    	this.scrolling = false
    }

    if(scrollTop != this.state.scrollTop){
    	this.setState({...this.state, scrollTop: scrollTop})
  	}
	}

	componentWillReceiveProps(nextProps) {

	}

	componentDidMount() {
		this.contentNode = ReactDOM.findDOMNode(this.refs.content)
    this.computeSizes()
	}

	componentDidUpdate() {
		this.computeSizes()
  }

  computeSizes() {
    if(this.contentNode && this.contentNode.offsetHeight != this.state.containerHeight){
    	this.state.containerHeight = this.contentNode.offsetHeight
    	if(this.props.autoBottom && !this.scrolling && this.contentNode.offsetHeight > this.props.height)
    		this.state.scrollTop = -(this.contentNode.offsetHeight - this.props.height)
    	this.setState({...this.state})
    }
  }

	render() {

		const styles = getStyles(this.props)

		return (
			<div
				onWheel={this.handleWheel.bind(this)}
				style={styles.wrapper}
			>
				<div
					ref="content"
					style={{marginTop: this.state.scrollTop, transition: 'margin-top 300ms'}}
				>
					{this.props.children}
				</div>
				<ScrollBar containerHeight={this.state.containerHeight} scrollTop={this.state.scrollTop} height={this.props.height} />
			</div>
		)
	}
}

function getStyles(props) {
	return {
		wrapper: {
			height: props.height,
			overflow: 'hidden',
			position: 'relative'
		}
	}
}

ScrollAuto.propTypes = {
	height: React.PropTypes.number.isRequired
}