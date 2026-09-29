const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/lokasi", async (req, res) => {
    const kota = req.query.q || "jakarta";
    const apiKey = "fezatQGnBmDQOtdle6Z7"; 
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(kota)}.json?key=${apiKey}&language=id`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Gagal mengambil data dari MapTiler");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Gagal mengambil data dari MapTiler" });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});