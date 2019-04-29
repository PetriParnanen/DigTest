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

router.delete("/", (req, res) => {
	Contact.delete({ _id: req.currentContact._id })
		.then()
		.catch(() => res.status(400).json({ errors: "Failed deletion" } ));
});

module.exports = router;