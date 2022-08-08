import mongoose from 'mongoose';
import '../../env.js'

import { schemaOptionsBase } from "./schema.js";
var URL = "";

switch (process.env.NODE_ENV) {
    case 'production':
        URL = process.env.DB_URL
        break;

    case 'development':
        URL = 'mongodb://localhost:27017/' + process.env.DB_DEV_NAME
        break;

    default:
        URL = 'mongodb://localhost:27017/' + process.env.DB_TEST_NAME
        break;
}


mongoose.connect(URL)
    .catch(err => {
        throw 'Banco não conseguiu se conectar'
    });

export { schemaOptionsBase };
export default mongoose;
