const video = document.querySelector('#video')
const c_out = document.querySelector('#canvas-out')
const ctx_out = c_out.getContext('2d')
const c_tmp = document.createElement('canvas')
const ctx_tmp = c_tmp.getContext('2d')
const computeFrame = () => {
	console.log('starting emulate...')
	ctx_tmp.drawImage(video, 0, 0, video.clientWidth, video.clientHeight)
	let frame = ctx_tmp.getImageData(0, 0, video.clientWidth, video.clientHeight)
	for (let i = 0; i < frame.data.length / 4; i++) {
		let r = frame.data[i * 4 + 0]
		let g = frame.data[i * 4 + 1]
		let b = frame.data[i * 4 + 2]
		if (r < 240 && r > 90 && g < 230 && g > 90 && b < 240 && b > 160) {
			console.log('removed')
			frame.data[i * 4 + 3] = 0
		}
	}

	ctx_out.putImageData(frame, 0, 0)
	setTimeout(computeFrame, 0)
}

let init = () => {
	c_tmp.setAttribute('width', 400)
	c_tmp.setAttribute('height', 250)
	video.addEventListener('play', computeFrame)
}

document.addEventListener('DOMContentLoaded', () => {
	init()
})
