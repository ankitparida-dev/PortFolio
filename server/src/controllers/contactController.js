const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// ✅ Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
    tls: {
        rejectUnauthorized: false
    }
});

// ✅ Submit contact form - INSTANT RESPONSE
const submitContact = async (req, res) => {
    try {
        console.log('📩 New message from:', req.body.name || 'Unknown');
        
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }
        
        // ✅ Save to MongoDB (fast)
        const contact = await Contact.create({
            name,
            email,
            subject: subject || 'No Subject',
            message
        });
        
        console.log(`✅ Saved to MongoDB, ID: ${contact._id}`);
        
        // ✅ Send email in background WITHOUT await
        // This runs parallel and doesn't block the response
        sendEmailInBackground(name, email, subject, message);
        
        // ✅ Send INSTANT response to user
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        
    } catch (error) {
        console.error('❌ Contact error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    }
};

// ✅ Email function runs in background - DOESN'T BLOCK
const sendEmailInBackground = async (name, email, subject, message) => {
    try {
        console.log('📧 Sending email in background...');
        
        const emailSubject = subject && subject.trim() !== '' 
            ? subject 
            : message.split(' ').slice(0, 6).join(' ') + '...';
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `📩 New Portfolio Message from ${name}`,
            html: `
                <h2>📩 New Message from Portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${emailSubject}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${message}</p>
                <hr>
                <p style="color: #888; font-size: 0.8rem;">
                    Sent on: ${new Date().toLocaleString()}
                </p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        
    } catch (error) {
        console.error('❌ Email error:', error.message);
    }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (Admin only)
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Admin only)
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Mark contact as read
// @route   PUT /api/contact/:id/read
// @access  Private (Admin only)
const markAsRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    submitContact,
    getContacts,
    getContactById,
    deleteContact,
    markAsRead
};