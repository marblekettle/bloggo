import React from 'react';

interface ButtonProps {
	text: string;
	class: string;
	func: Function;
}

function Button({text, styleclass, func}: React.ComponentProps<any>) {
	return (
<button className={styleclass} onClick={func}>{text}</button>
	);
}

export function ButtonBar({barButtons, barStyle}: React.ComponentProps<any>) {
	const buttons = barButtons.map((b: ButtonProps) => {
		return (
<Button text={b.text} styleclass={b.class} func={b.func}/>
		);
	});
	return(
<div className={barStyle}>{buttons}</div>
	);
}
