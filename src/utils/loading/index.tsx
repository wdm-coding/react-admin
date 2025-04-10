import ReactDOM from 'react-dom/client'
import Loading from './loading'
let count = 0
export const showLoading = () => {
	if (count === 0) {
		const spinWrapDiv = document.createElement('div')
		spinWrapDiv.setAttribute('id', 'root-loading')
		document.body.appendChild(spinWrapDiv)
		ReactDOM.createRoot(spinWrapDiv).render(<Loading />)
	}
	count++
}

export const hideLoading = () => {
	if (count < 0) return
	count--
	if (count === 0) {
		const spinWrapDiv = document.getElementById('root-loading') as HTMLDivElement
		document.body.removeChild(spinWrapDiv)
	}
}
