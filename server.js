const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

const config = {
    user: 'Himanshu',
    password: '130996',
    server: '10.1.3.160',
    database: 'Project_a',
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
        .query('SELECT * FROM UserData WHERE UserID = @username AND Password = @password');
  
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
