import { Message } from 'discord.js';

import CommandInterface from '../CommandInterface';

export default class Ping implements CommandInterface {
    name = 'ping';
    args = 0;
    description = 'Return a greeting to the user'    
    usage = '';

    async execute (message: Message) {
	return message.channel.send('Pong');
    }

}
