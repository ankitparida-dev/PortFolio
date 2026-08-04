const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// ✅ Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }
        
        // ✅ If no subject, create one from first few words of message
        const emailSubject = subject && subject.trim() !== '' 
            ? subject 
            : message.split(' ').slice(0, 6).join(' ') + '...';
        
        // ✅ Save to MongoDB
        const contact = await Contact.create({
            name,
            email,
            subject: subject || 'No Subject',
            message
        });
        
        console.log(`📩 New message from: ${name} (${email})`);
        console.log(`📝 Subject: ${emailSubject}`);
        console.log(`📝 Message: ${message.substring(0, 50)}...`);
        
        // ✅ Send email notification
        try {
            const mailOptions = {
                // ✅ IMPORTANT: From = You, To = You, ReplyTo = User
                from: process.env.EMAIL_USER,        // Your email (sender)
                to: process.env.EMAIL_USER,          // Your email (recipient)
                replyTo: email,                      // ✅ When you reply, it goes to the user!
                subject: `📩 New Portfolio Message from ${name}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
                            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                            .header { text-align: center; border-bottom: 3px solid #2ec4b6; padding-bottom: 20px; }
                            .header h1 { color: #2ec4b6; margin: 0; font-size: 24px; }
                            .content { padding: 20px 0; }
                            .field { margin-bottom: 15px; }
                            .field-label { font-weight: bold; color: #333; display: block; margin-bottom: 5px; }
                            .field-value { color: #555; padding: 8px 12px; background: #f8f9fa; border-radius: 6px; }
                            .message-box { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #2ec4b6; margin-top: 5px; }
                            .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px; }
                            .badge { display: inline-block; background: #2ec4b6; color: white; padding: 2px 10px; border-radius: 20px; font-size: 12px; }
                            .status-new { background: #ff6b6b; color: white; padding: 2px 10px; border-radius: 20px; font-size: 12px; margin-left: 5px; }
                            .reply-info { 
                                background: #f0fdf4; 
                                padding: 12px 15px; 
                                border-radius: 8px; 
                                border: 1px solid #2ec4b6; 
                                margin: 15px 0;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>📩 New Portfolio Message</h1>
                                <p style="color: #888; margin: 5px 0 0;">From: ${name}</p>
                                <span class="status-new">🔴 NEW</span>
                            </div>
                            <div class="content">
                                <div class="field">
                                    <span class="field-label">👤 Name</span>
                                    <div class="field-value">${name}</div>
                                </div>
                                <div class="field">
                                    <span class="field-label">📧 Email</span>
                                    <div class="field-value">
                                        <a href="mailto:${email}" style="color: #2ec4b6; text-decoration: none;">${email}</a>
                                    </div>
                                </div>
                                <div class="field">
                                    <span class="field-label">📝 Subject</span>
                                    <div class="field-value" style="font-weight: bold; color: #2ec4b6;">
                                        ${emailSubject}
                                    </div>
                                </div>
                                <div class="field">
                                    <span class="field-label">💬 Message</span>
                                    <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                                </div>
                                <div class="reply-info">
                                    <strong>📌 Reply to: <a href="mailto:${email}" style="color: #2ec4b6;">${email}</a></strong>
                                    <p style="margin: 5px 0 0; font-size: 12px; color: #666;">
                                        ℹ️ Click "Reply" and it will go directly to ${name}
                                    </p>
                                </div>
                                <div style="margin-top: 20px; text-align: center;">
                                    <span class="badge">📅 ${new Date().toLocaleString()}</span>
                                </div>
                            </div>
                            <div class="footer">
                                <p>This message was sent from your portfolio contact form.</p>
                                <p style="margin-top: 5px;">
                                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/contact" style="color: #2ec4b6;">Visit Portfolio</a>
                                    &nbsp;|&nbsp;
                                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin" style="color: #2ec4b6;">View All Messages</a>
                                </p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            };
            
            const info = await transporter.sendMail(mailOptions);
            console.log(`✅ Email notification sent: ${info.messageId}`);
            console.log(`📧 Reply to: ${email}`);
            
        } catch (emailError) {
            console.error('❌ Email error:', emailError.message);
            // Don't fail the request if email fails
        }
        
        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        
    } catch (error) {
        console.error('❌ Contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
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