import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';

import CommandInterface from '../CommandInterface';

/*
 * Loads the commands from a determined path
 */
export function loadCommands(path: string): Collection<String, CommandInterface> {
    const commandsPath = resolve(__dirname, '..', path);
    //console.log(commandsPath);

    const commandFiles = readdirSync(commandsPath)
	.filter(file => file.endsWith('.ts'));

    if (commandFiles.length === 0) {
	throw new Error(`Commands don't found in ${commandsPath}`);
    }

    console.log('Command files', commandFiles);
    const collection: Collection<String, CommandInterface> = new Collection;

    for (const file of commandFiles) {
	//console.log(resolve(commandsPath, file));
	const { default: command } = require(resolve(commandsPath, file));
	//console.log(command);	
	const instance = new command as CommandInterface;
	collection.set(instance.name, instance);
	console.log(`Command ${instance.name} is loaded...`);
    }

    return collection;
}
