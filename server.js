const app = require("./src/app");
const connectDatabase = require("./src/config/db")
const cors = require('cors');
app.use(cors({
origin : 'https://deploy-t1of.onrender.com',
credentials : true
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
connectDatabase();
