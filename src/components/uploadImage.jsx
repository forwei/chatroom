import React from 'react'

class UploadImage extends React.Component {

  handleClick(e) {
    let el = this.refs.file
    if (!el) {
      return
    }
    el.click()
    el.value = ''
  }

  handleFileChange(e) {
    let files = e.target.files
    this.uploadFiles(files)
  }

  uploadFiles(files) {
    let len = files.length
    for (let i = 0; i < len; i++) {
      let file = files.item(i)
      file.uid = Math.random().toString().substr(2)
      this.upload(file)
    }
  }

  upload(file) {
    let data = new FormData()
    data.append('file', file)

    fetch('/room/upload', {
      credentials: 'include',
      method: 'post',
      body: data
    }).then(res => {
      res.json().then(json => {
        this.props.onSuccess(json)
      })
    }).catch(e => {
      console.log('upload image error')
    })
  }

  render() {
    return(
      <div style={this.props.style} onClick={this.handleClick.bind(this)}>
        <input type="file" style={{display: 'none'}} ref="file" onChange={this.handleFileChange.bind(this)} />
        {this.props.children}
      </div>
    )
  }
}

export default UploadImage