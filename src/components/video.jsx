import React from 'react'

import Dialog from './dialog'

export default class Video extends React.Component{

	submit(e) {
    e.preventDefault()
    alert('it works!')
  }

	render() {
		return(
			<div>

			<form onSubmit={this.submit.bind(this)}>

<label htmlFor="male">Male</label>
<input type="radio" name="sex" id="male" />
<br />
<label htmlFor="female">Female</label>
<input type="radio" name="sex" id="female" />

<label>
            <input type="radio" value="option1" />
            Option 1
          </label>

        <button>Click me</button>
      </form>

			</div>
		)
	}
}