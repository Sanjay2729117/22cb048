const express = require('express');
const axios = require('axios');
const app = express();

const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDU3MTczLCJpYXQiOjE3NDI0NTY4NzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ1Njc4MzA5LWU0ZDQtNGQwMi04OWY5LWRiMzQ5YTBiMzYzNCIsInN1YiI6IjIyY2IwNDhAZHJuZ3BpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiZDU2NzgzMDktZTRkNC00ZDAyLTg5ZjktZGIzNDlhMGIzNjM0IiwiY2xpZW50U2VjcmV0IjoiQ09raVJFVE1MVUFlbm5WTyIsIm93bmVyTmFtZSI6InNhbmpheSIsIm93bmVyRW1haWwiOiIyMmNiMDQ4QGRybmdwaXQuYWMuaW4iLCJyb2xsTm8iOiIyMmNiMDQ4In0.uiXKldQuJAFg9bIZT5r98jThHPJi6jgGzaNmEer63yA'
const serverUrl = {
    "p": "http://20.244.56.144/test/primes",
    "f": "http://20.244.56.144/test/fibo",
    "e": "http://20.244.56.144/test/even",
    "r": "http://20.244.56.144/test/rand"
};

const windowSize = 10;
let window = [];

async function fetchData(source) {
    if (!(source in serverUrl)) {
        throw new Error("Invalid source");
    }

    try {
        const response = await axios.get(serverUrl[source], {
            headers: {
                "Authorization": `Bearer ${JWT_TOKEN}`
            },
            timeout: 500
        });

        let data = response.data;
        let num = [];

        if (Array.isArray(data)) {
            num = [...new Set(data)];
        } else if (data.numbers && Array.isArray(data.numbers)) {
            num = [...new Set(data.numbers)];
        } else {
            throw new Error("Invalid data format");
        }

        num = num.filter(n => typeof n === 'number' && n >= 0);
        return num;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

app.get("/calculate", async (req, res) => {
    const source = req.query.source;

    try {
        const num = await fetchData(source);

        if (!num.length) {
            return res.status(400).json({ detail: "No valid numbers" });
        }

        window = [...new Set([...window, ...num])];
        if (window.length > windowSize) {
            window = window.slice(-windowSize);
        }

        
        const avg = window.reduce((acc, curr) => acc + curr, 0) / window.length;

        return res.json({
            windowPrevState: window.slice(0, -num.length),
            windowCurrState: window,
            numbers: num,
            avg: avg.toFixed(2)
        });

    } catch (error) {
        return res.status(400).json({ detail: error.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
