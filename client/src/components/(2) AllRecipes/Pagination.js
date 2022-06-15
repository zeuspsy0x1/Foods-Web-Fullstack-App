import React from 'react'

export default function Paginate({ recipes, paginate }) {
	const pageNumbers = []
	const recipesPerPage = 9

	for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
		pageNumbers.push(i)
	}
	return (
		<nav className=''>
			{pageNumbers &&
				pageNumbers.map((number) => (
					<button key={number} onClick={() => paginate(number)}>
						{number}
					</button>
				))}
		</nav>
	)
}
