// server.js (Axios Version - More Stable)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Humne fetch hata kar axios lagaya

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Aapki API Key (Jo aapne bheji thi)
// server.js
// ... upar ke imports wahi rahenge
const API_KEY = process.env.MY_GEMINI_KEY; // Ab key code mein nahi, server ki settings mein hogi
// ... baaki code wahi rahega
// Hum "gemini-2.5-flash" use karenge jo sabse reliable hai
 const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;

app.post('/ask-ai', async (req, res) => {
    try {
        const { system, message } = req.body;
        
        // Axios se Google ko call karna (Ye automatic JSON handle karta hai)
        const response = await axios.post(GEMINI_URL, {
            contents: [{ parts: [{ text: message }] }],
            systemInstruction: { parts: [{ text: system }] }
        });

        // Agar safalta mili to data bhejo
        res.json(response.data);

    } catch (error) {
        // Asli error Terminal mein dikhana zaroori hai
        console.error("❌ GOOGLE ERROR:", error.response ? error.response.data : error.message);
        
        // Frontend ko batana ki error aaya
        res.status(500).json({ 
            error: "Server Error", 
            details: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});