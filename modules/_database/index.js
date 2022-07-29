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


const URL = 'mongodb+srv://admin:admin@cluster0.cccmi.mongodb.net/?retryWrites=true&w=majority' 
mongoose.connect(URL)
    .catch(err => {
        throw 'Banco não conseguiu se conectar'
    });

export { schemaOptionsBase };
export default mongoose;
