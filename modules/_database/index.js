import mongoose from 'mongoose';
import '../../env.js'

import { schemaOptionsBase } from "./schema.js";
let DB_NAME = ""
switch (process.env.NODE_ENV) {
    case 'production':
        DB_NAME = process.env.DB_PRODUCTION_NAME
        break;

    case 'development':
        DB_NAME = process.env.DB_DEV_NAME
        break;

    default:
        DB_NAME = process.env.DB_TEST_NAME
        break;
}


const URL = process.env.DB_URL

mongoose.connect(URL)
    .catch(err => {
        throw 'Banco não conseguiu se conectar'
    });

export { schemaOptionsBase };
export default mongoose;
