const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

const config = {
    user: 'sa',
    password: 'sa@2014',
    server: 'SERVERSAP',
    database: 'INV1',
    options: {
        encrypt: false,
        trustServerCertificate: true, 
    },
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('SELECT * FROM OrderData WHERE DocEntry = @username AND BaseEntry = @password');
  
      if (result.recordset.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
