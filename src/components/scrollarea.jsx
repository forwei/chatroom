import React from 'react'


export default class ScrollArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollTop: 0
		}
		this.showCount = 0
		this.showIndex = 0
		this.topHeight = 0
		this.bottomHeight = 0
		this.containerHeight = 0
	}

	handleWheel(event) {
    let deltaY = event.deltaY;

		event.preventDefault();
    event.stopPropagation();

    if(this.containerHeight < this.props.height)
    	return
		
    this.state.scrollTop -= deltaY
    if(this.state.scrollTop > 0)
    	this.state.scrollTop = 0

    let maxBottom = this.containerHeight - this.props.height

    if(this.state.scrollTop < -maxBottom){
    	this.state.scrollTop = -maxBottom
    }
    this.setState({...this.state})
	}

	componentWillMount() {
		this.computeSizes()
	}

	componentWillUpdate() {
		this.computeSizes()
		//console.log('update')
	}

	computeSizes() {
		this.containerHeight = this.props.children.length * this.props.itemHeight
		this.showIndex = Math.floor(Math.abs((this.state.scrollTop) / this.props.itemHeight))

		this.showCount = Math.ceil(this.props.height / this.props.itemHeight)

		if(this.showIndex < 2){
			this.showIndex = 0
		}else{
			this.showIndex -= 2
			this.showCount += 2
		}
		this.topHeight = this.showIndex * this.props.itemHeight

		if((this.showIndex + this.showCount) >= this.props.children.length){
			this.bottomHeight = 0
		}else{
			let pel = Math.min(this.props.children.length - (this.showIndex + this.showCount), 2)
			this.showCount += pel
			this.bottomHeight = this.containerHeight - ((this.showIndex + this.showCount) * this.props.itemHeight)
		}
		
	}

	render() {
		let {children} = this.props;

		const styles = getStyles(this.props)

		let childrens = []
		for(let i = this.showIndex; i < this.showIndex + this.showCount; i++){
			childrens.push(children[i])
		}

		return (
			<div
				ref={x => this.wrapper = x}
				onWheel={this.handleWheel.bind(this)}
				style={styles.wrapper}
			>
				<div
					ref={x => this.content = x}
					style={{marginTop: this.state.scrollTop, transition: 'margin-top 300ms'}}
				>
					<div style={{height: this.topHeight}} />
					{childrens}
					<div style={{height: this.bottomHeight}} />
				</div>
			</div>
		)
	}
}

function getStyles(props) {
	return {
		wrapper: {
			height: props.height,
			overflow: 'hidden'
		}
	}
}

ScrollArea.propTypes = {
	itemHeight: React.PropTypes.number.isRequired,
	height: React.PropTypes.number.isRequired
}