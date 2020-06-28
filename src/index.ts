import { App } from './AppBot';
import * as dotenv from 'dotenv';

const bot = new App;
dotenv.config();
bot.start();
