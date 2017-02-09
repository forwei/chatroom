import {Component, PropTypes} from 'react'
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom'

class RenderToLayer extends Component {

  componentDidMount() {
    this.renderLayer()
  }

  componentDidUpdate() {
    this.renderLayer()
  }

  componentWillUnmount() {
    this.unrenderLayer()
  }

  renderLayer() {
  	if (!this.layer) {
  		this.layer = document.createElement('div')
  		document.body.appendChild(this.layer)
  	}

  	const layerElement = this.props.children
  	this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer)
  }

  unrenderLayer() {
  	if (!this.layer) {
      return
    }

    unmountComponentAtNode(this.layer)
    document.body.removeChild(this.layer)
    this.layer = null
  }

  render() {
    return null
  }
}

export default RenderToLayer