import {Component, PropTypes} from 'react'
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom'

class RenderToLayer extends Component {
  constructor(props) {
    super(props)
    this.onClickAway = this.onClickAway.bind(this)
  }

  componentDidMount() {
    this.renderLayer()
  }

  componentDidUpdate() {
    this.renderLayer()
  }

  componentWillUnmount() {
    this.unrenderLayer()
  }

  onClickAway(e) {
    if (e.defaultPrevented || !this.props.componentClickAway) {
      return
    }

    const el = this.layer
    if (!el.contains(e.target)){
      this.props.componentClickAway(e)
    }
  }

  renderLayer() {
  	if (!this.layer) {
  		this.layer = document.createElement('div')
  		document.body.appendChild(this.layer)
      if (this.props.componentClickAway) {
        setTimeout(() => {
          window.addEventListener('touchstart', this.onClickAway)
          window.addEventListener('click', this.onClickAway)
        }, 0)
      }
  	}
  	const layerElement = this.props.children
  	this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer)
  }

  unrenderLayer() {
  	if (!this.layer) {
      return
    }
    if (this.props.componentClickAway) {
      window.removeEventListener('touchstart', this.onClickAway)
      window.removeEventListener('click', this.onClickAway)
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