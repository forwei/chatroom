import Promise from 'promise-polyfill'
if (!window.Promise) {
  window.Promise = Promise
}

//获取sina服务器表情库
fetch('/room/api/emotions', {
	credentials: 'include'
}).then(res => {
	res.json().then((json) => {
    for ( let i in json) {
    	if (json[i].category == '') {
				emotions.push( {
					name : json[i].phrase,
					icon : json[i].icon
				})
				uSinaEmotionsHt.put(json[i].phrase, json[i].icon);
    	}
    }
  })
}).catch(e => {
	console.log('emotion server error')
})

let emotions = new Array()
let uSinaEmotionsHt = new Hashtable()
let emotion = {
	getEmotions() {
		return emotions
	},
	analyticEmotion(s) {
		if(typeof (s) != "undefined") {
			let sArr = s.match(/\[.*?\]/g)
			if(sArr)
				for(let i = 0; i < sArr.length; i++){
					if(uSinaEmotionsHt.containsKey(sArr[i])) {
						let reStr = "<img src=\"" + uSinaEmotionsHt.get(sArr[i]) + "\" height=\"22\" width=\"22\" />"
						s = s.replace(sArr[i], reStr)
					}
				}
		}
		return s
	}
}

export default emotion


//自定义hashtable
function Hashtable() {
    this._hash = new Object()
    this.put = function(key, value) {
        if (typeof (key) != "undefined") {
            if (this.containsKey(key) == false) {
                this._hash[key] = typeof (value) == "undefined" ? null : value
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    this.remove = function(key) { delete this._hash[key]; }
    this.size = function() { var i = 0; for (var k in this._hash) { i++; } return i; }
    this.get = function(key) { return this._hash[key]; }
    this.containsKey = function(key) { return typeof (this._hash[key]) != "undefined"; }
    this.clear = function() { for (var k in this._hash) { delete this._hash[k]; } }
}