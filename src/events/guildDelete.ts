import { Events, Guild } from "discord.js";

import { eventConsole } from ".";
import { Mentionable } from "../data/orm/mentionables";
import { GuildConfig } from "../data/orm/guildConfig";

export default {
	name: Events.GuildDelete,
	once: false,

	async execute(guild: Guild) {
		eventConsole.log(`\nOn: [fg=green]${this.name}[/>]\nName: ${guild.name}\nID: ${guild.id}\nMembers: ${guild.memberCount}\n`)
		
		await Mentionable.onGuildDelete(guild);
		delete Mentionable.mentionablesCache[guild.id]; //? Delete the guilds cache
		
		await GuildConfig.onGuildDelete(guild);
	},
}