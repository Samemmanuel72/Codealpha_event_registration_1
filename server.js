const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Event = require('./models/Event');
const Registration = require('./models/Registration');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB (Ensure MongoDB is running locally, or replace with Atlas URI)
mongoose.connect('mongodb://127.0.0.1:27017/insane-events', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected 🚀'))
  .catch(err => console.log('MongoDB Error:', err));

// Seed initial data for testing
const seedDatabase = async () => {
    const count = await Event.countDocuments();
    if (count === 0) {
        await Event.insertMany([
            { title: "Cyberpunk Hackathon 2077", description: "Build the future of neural interfaces.", date: new Date('2026-10-15'), capacity: 100, location: "Neon City" },
            { title: "Quantum AI Summit", description: "Exploring multi-dimensional machine learning.", date: new Date('2026-11-20'), capacity: 50, location: "Virtual Matrix" },
            { title: "Synthwave Music Festival", description: "Retro-futuristic beats all night.", date: new Date('2026-12-31'), capacity: 500, location: "The Grid" }
        ]);
        console.log('Database seeded with insane events! 🌌');
    }
};
seedDatabase();

// --- API ENDPOINTS ---

// View Event List
app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// View Event Details
app.get('/api/events/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
});

// Submit Registration Form
app.post('/api/registrations', async (req, res) => {
    const { name, email, eventId } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) user = await User.create({ name, email });

        const newReg = await Registration.create({ user: user._id, event: eventId });
        res.status(201).json(newReg);
    } catch (err) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

// View User Registrations (by email)
app.get('/api/registrations/:email', async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.json([]);

    const registrations = await Registration.find({ user: user._id }).populate('event');
    res.json(registrations);
});

// Cancel Registration
app.delete('/api/registrations/:id', async (req, res) => {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Registration cancelled' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} ⚡`));