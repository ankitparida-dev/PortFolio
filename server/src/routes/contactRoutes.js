const express = require('express');
const {
    submitContact,
    getContacts,
    getContactById,
    deleteContact
} = require('../controllers/contactController');

const router = express.Router();

router.post('/', submitContact);
router.get('/', getContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

module.exports = router;