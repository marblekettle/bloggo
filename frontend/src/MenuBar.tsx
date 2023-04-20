import React from 'react';

interface BarButtonProps {
	text: string;
	func: Function;
}

function BarButton({text, func}: React.ComponentProps<any>) {
	return (
<button className='boxybutton' onClick={func}>{text}</button>
	);
}

export function MenuBar({barButtons}: React.ComponentProps<any>) {
	const buttons = barButtons.map((b: BarButtonProps) => {
		return (
<BarButton text={b.text} func={b.func}/>
		);
	});
	return(
<div className='boxy'>{buttons}</div>
	);
}
