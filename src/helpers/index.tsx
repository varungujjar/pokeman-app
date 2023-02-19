export const getImageUrl = (id: number) => {
	const imageId = ('000' + id).substr(-3); //requires a 3 digit number for image filenames
	const imageUrl = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails/${imageId}.png`;
	return imageUrl;
};

export const getIdFromUrl = (url: any) => {
	let id = url.match(/\/(\d+)+?/)[1];
	return parseInt(id);
};
