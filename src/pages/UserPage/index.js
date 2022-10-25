import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import { signOut } from '../../store/user'

function UserPage() {
	const dispatch = useDispatch()

	return (
		<div>
			<h1>User Page</h1>
			<Button color={"danger"} outline onClick={() => dispatch(signOut())}>Выйти</Button>
		</div>
	)
}

export default UserPage