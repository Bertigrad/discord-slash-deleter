require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const prompt = require('prompt-sync')();
const clc    = require('cli-color');
const wait   = require('node:timers/promises').setTimeout;


client.once('ready', async () => {

    /* ---------- Remove ALL global commands + every guild-scoped command ---------- */
    async function deleteEverywhere() {

        /* 1) Wipe GLOBAL (application-scoped) commands */
        await client.application.commands.set([]);
        console.log(clc.yellowBright('✓ Global slash commands cleared'));

        /* 2) Iterate over every guild the bot is in and wipe their commands */
        const guilds = await client.guilds.fetch();      // fresh list from the API
        console.log(clc.cyanBright(`• Starting cleanup in ${guilds.size} guild(s)…`));

        for (const [id, guild] of guilds) {
            try {
                await client.application.commands.set([], id);      // empty list per guild
                console.log(clc.greenBright(`  └─ ${guild.name} (${id}) ➜ cleared`));
            } catch (err) {
                console.log(clc.redBright(`  └─ ${guild.name} (${id}) ➜ error: ${err.code ?? err.message}`));
            }
        }

        console.log(clc.yellowBright('✓ All guild slash commands cleared'));
    }
    /* --------------------------------------------------------------------------- */



    /* ------------------------------- CLI MENU FLOW ----------------------------- */
    async function menu() {

        // (1) Show current GLOBAL commands
        const globalCmds = await client.application.commands.fetch();
        console.log(clc.cyanBright('================ GLOBAL ================='));
        if (globalCmds.size === 0) console.log(clc.magenta('— No commands —'));
        else globalCmds.forEach(cmd => console.log(`${clc.green(cmd.name)}  ${clc.red('|')}  ${cmd.id}`));
        console.log(clc.cyanBright('=========================================\n'));

        // (2) Options
        console.log(`${clc.greenBright('1. Delete GLOBAL commands only')}\n${clc.greenBright('2. Delete GLOBAL + all GUILD commands')}`);
        const choice = prompt(clc.blueBright('Your choice (1 / 2): '));

        if (choice === '1') {
            await client.application.commands.set([]);
            console.log(clc.yellowBright('✓ Global slash commands cleared'));
        } else if (choice === '2') {
            await deleteEverywhere();
        } else {
            console.log(clc.redBright('Invalid option, shutting down.'));
        }

        await wait(500);
        client.destroy();
    }
    /* --------------------------------------------------------------------------- */

    console.log(clc.cyanBright(`Bot ready: ${client.user.tag} (${client.user.id})`));
    await menu();
});

client.login(process.env.TOKEN);
