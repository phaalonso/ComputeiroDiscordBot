import CommandInterface from '../CommandInterface';
import {Message, DiscordAPIError} from 'discord.js';

export default class Clear implements CommandInterface {
    name = 'clear';
    args = 1;
    usage = 'number';
    description = 'Clear a certain quantity of messages';
    
    async execute(msg: Message, args: string[]) {
	const amount = Number.parseInt(args[0]);

	try {
	    const deleted = await msg.channel.bulkDelete(amount);
	    return msg.reply(`Deleted ${deleted.size} mensages`);
	} catch (err) {
	    if (err instanceof DiscordAPIError)
		return msg.reply("Sorry you can't bulkDelete messages that are over 14 days old");
	}   
    }
}
