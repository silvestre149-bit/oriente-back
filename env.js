/* importar no mesmo arquivo do index não funciona
logo tive que importar em um arquivo diferente
*/

import { config } from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
config({ path: path.join(__dirname, 'config/environment/.env') })