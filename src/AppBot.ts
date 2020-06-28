import { Client, Message, Collection } from 'discord.js'

import CommandInterface from './CommandInterface';

import { loadCommands } from './utils/dynamicCommands';

export class App {
    protected client!: Client;
    protected commandsHandler!: Collection<String, CommandInterface>; 
    protected prefix = '!';

    constructor() {
	this.client = new Client();
	this.commandsHandler = loadCommands('commands');
	this.initializeMessageHandler();
    }
    
    protected initializeMessageHandler(): void {
	this.client.on('message', (msg: Message) => {
	    if (msg.author.bot || !msg.content.startsWith(this.prefix))
		return;

	    const args = msg.content.slice(this.prefix.length)
		.toLocaleLowerCase()
		.split(/ +/);
	    
	    const commandName = args.shift();

	    if (!this.commandsHandler.has(commandName)) {
		return msg.reply("Sorry, I can't find this command :cry:");
	    }

	    const command: CommandInterface = this.commandsHandler.get(commandName);
	    
	    // The command need to receive args
	    if (command.args !== 0) {
		if (args.length == 0 || command.args !== args.length)
		    return msg.reply(`Sorry, this command require the args: ${command.usage}`);

	    } else
		// The command don't need to receive args, and received
		if (args.length > 0) return msg.reply("This command don't need args");

	    try {
		return command.execute(msg, args);
	    } catch (err) {
		console.error(err);
		return msg.reply('Sorry, something happened');
	    }

	});
    
	this.client.on('ready', () => {
	    console.log('Bot is online!');
	});
    }

    public start(): void {
	const token = process.env['TOKEN'];
	if (!token) {
	    console.error("Token don't found!");
	    process.exit(1);
	} else {
	    this.client.login(token);
	}

    }
}
