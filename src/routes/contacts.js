const express = require('express');
const authenticate = require('../middleware/authenticate');
const Contact = require('../models/Contact');
const parseErrors = require('../utils/parseErrors');

const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
	Contact.find({ userId: req.currentUser._id })
		.then(contacts => res.json({ contacts }));
});

router.post("/", (req, res) => {
	Contact.create({...req.body.contact, userId: req.currentUser._id })
		.then(contact => res.json({ contact }))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) } ));
});

router.put("/", (req, res) => {
	Contact.findOneAndUpdate({ userId: req.currentUser._id, id: req.body.contact.id }, 
		{ ...req.body.contact, userId: req.currentUser._id }, { new: true })
		.then(contact => res.json({ contact }))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) } ));
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	Contact.findOneAndDelete({ userId: req.currentUser._id, _id: id })
		.then(() => res.json({ id }))
		.catch(() => res.status(400).json({ errors: "Failed deletion" } ));
});

module.exports = router;