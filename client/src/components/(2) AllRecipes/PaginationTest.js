/* 
1. hacer la implementacion de este componente en nav, todos los estados van ahi
2. practicar pasarle el indexprincipio y indexfin a los componentes allrecipes y renderizefilteredrecipes. Dentro de esos componentes al array que me traigo de redux, hacer un slice de los elementos que se deben mostrar y ese array si le paso a hacer el map de renderizado.
3. Create a new component called Pagination. copiar y pegar la implementacion de Pagination de PI ELLA, es lo mismo.



*/

import React, { useState } from 'react'

function PaginationTest() {
	let arrOfNames = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
		59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
		87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
	]

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(9)

	const [totalItems, setTotalItems] = useState(arrOfNames.length)
	const [names, setNames] = useState(arrOfNames)

	const indexOfLastItem = currentPage * itemsPerPage //1x9=9 2x9=18 3x9=27 4x9=36 5x9=45 6x9=54
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = names.slice(indexOfFirstItem, indexOfLastItem)

	return (
		<div>
			<h1>Pagination Test</h1>
			<p>Total items: {totalItems}</p>
			<p>Items per page: {itemsPerPage}</p>
			<p>Current page: {currentPage}</p>
			<p>Index of first item: {indexOfFirstItem}</p>
			<p>Index of last item: {indexOfLastItem}</p>
			<p>Current items to show: {currentItems}</p>
			<button onClick={() => setCurrentPage(currentPage + 1)}>Next page</button>
			<button onClick={() => setCurrentPage(currentPage - 1)}>Previous page</button>
		</div>
	)
}

export default PaginationTest
