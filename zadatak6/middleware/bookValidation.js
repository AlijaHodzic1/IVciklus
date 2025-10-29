const bookValidation = (req, res, next) => {
	const { title, author, year, pages } = req.body;

	if (!title || !author || !year || !pages)
		return res.status(400).send("Los request. Moraju se sva polja popuniti.");

	if (title && title.length < 2)
		return res.status(400).send("Prekratko ime knjige.");

	if (pages && +pages < 10) return res.status(400).send("Premalo stranica.");

	next();
};

module.exports = bookValidation;
