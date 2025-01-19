const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173', // Match the frontend origin
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse form URL-encoded data

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
});
app.use(limiter);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "abhijithnagula@gmail.com", // Environment variable for email
    pass: "vqpf ymcl anpr wfqo", // Environment variable for app password
  },
});

// Test route to verify the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Route to test email sending functionality
app.get('/send-email', (req, res) => {
  res.send('Send email route is working');
});

// POST route to send email
app.post(
  '/send-email',
  [
    check('to').isEmail().withMessage('Invalid recipient email format'),
    check('subject').notEmpty().withMessage('Subject is required'),
    check('text').notEmpty().withMessage('Message text is required'),
    check('email').isEmail().withMessage('Invalid sender email format'),
  ],
  (req, res) => {
    console.log('Request Body:', req.body);  // Log the request body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { to, subject, text, email } = req.body;

    // Define the email options
    const mailOptions = {
      from: email, // Sender email address
      to, // Recipient email address
      subject, // Email subject
      text, // Email body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email', error });
      }
      console.log('Email sent:', info.response);
      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
