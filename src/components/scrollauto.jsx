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
	}

	handleWheel(event) {
    let deltaY = event.deltaY;

		event.preventDefault();
    event.stopPropagation();

    if(this.state.containerHeight < this.props.height)
    	return
		
    this.state.scrollTop -= deltaY
    if(this.state.scrollTop > 0)
    	this.state.scrollTop = 0

    let maxBottom = this.state.containerHeight - this.props.height

    if(this.state.scrollTop < -maxBottom){
    	this.state.scrollTop = -maxBottom
    }

    this.setState({...this.state})
	}

	componentWillReceiveProps(nextProps) {

	}

	componentDidMount() {
    let content = ReactDOM.findDOMNode(this.refs.content)
    if(content.offsetHeight != this.state.containerHeight){
    	this.setState({containerHeight: content.offsetHeight, scrollTop: -(content.offsetHeight - this.props.height)})
    }
	}

	componentDidUpdate() {
    let content = ReactDOM.findDOMNode(this.refs.content)
    if(content.offsetHeight != this.state.containerHeight){
    	this.setState({containerHeight: content.offsetHeight, scrollTop: -(content.offsetHeight - this.props.height)})
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