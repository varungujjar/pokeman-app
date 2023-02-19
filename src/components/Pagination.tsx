import React, { MouseEventHandler } from 'react';
import Button from './Button';

type PaginationProps = {
	gotoNextPage: MouseEventHandler;
	gotoPrevPage: MouseEventHandler;
};

const Pagination = ({ gotoNextPage, gotoPrevPage }: PaginationProps) => {
	return (
		<div className="pagination">
			{gotoPrevPage && (
				<Button classname="button" onClick={gotoPrevPage}>
					Previous
				</Button>
			)}
			{gotoNextPage && (
				<Button classname="button" onClick={gotoNextPage}>
					Next
				</Button>
			)}
		</div>
	);
};

export default Pagination;
