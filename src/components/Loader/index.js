import React from 'react'
import './loader.sass'

function Loader({ size }) {
	return <div className={ `loader loader-${size}` }></div>
}

export default Loader