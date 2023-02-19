import React, { MouseEventHandler } from 'react';

type ButtonProps = {
	onClick: MouseEventHandler;
	classname: string;
	children: React.ReactNode;
};

const Button = ({ onClick, classname, children }: ButtonProps) => {
	return (
		<button onClick={onClick} className={classname}>
			{children}
		</button>
	);
};

export default Button;
