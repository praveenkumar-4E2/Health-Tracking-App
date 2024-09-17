const app = require("./app");
const { logger } = require('./middlewares/logger');

const connectDb = require("./config/MongoDB");
require("dotenv").config();

//connect to the Database
connectDb();

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});