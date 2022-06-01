import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
	const navigate = useNavigate();
	const aaaaa = () => {
		navigate('/AllRecipes');
	};

	return (
		<>
		<div className='LandingPage'>
		<div className='textIntro'>
			<h1>Welcome to the Recipe Book!</h1>
		</div>
				<button onClick={aaaaa} className='Enter'>
					Start
				</button>
		</div>
		</>
	);
}

export default LandingPage;
