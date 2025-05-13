# Discord Slash Command Deleter

A tiny CLI helper script that **wipes** every global and/or guild‑scoped slash command registered to your Discord application. Perfect for a fresh start after refactoring your bot’s command set.

---

## Features

* **Clear global commands** with one key‑press.
* **Clear every guild** the bot is in (guild‑scoped commands) just as easily.
* Zero external services—runs locally, needs only `prompt-sync` and `cli-color` for the terminal UI.
* Three‑step setup, single command to run.

---

## Requirements

| Requirement           | Version / Notes             | Why                          |
| --------------------- | --------------------------- | ---------------------------- |
| Node.js               | ≥ 18 (tested on 20.18.0)    | Modern syntax & fetch API    |
| discord.js            | **v14** (GatewayIntentBits) | Uses the latest REST helpers |
| Discord **BOT TOKEN** | –                           | Stored in a `.env` file      |

> **Using discord.js v13?** Replace every `GatewayIntentBits.Guilds` with `Intents.FLAGS.GUILDS`, or upgrade—v14+ is strongly recommended.

---

## Installation

````bash
# 1 » Clone the repo
$ git clone https://github.com/Bertigrad/discord-slash-deleter.git
$ cd discord-slash-deleter

# 2 » Install dependencies
$ npm install

# 3 » Open the `.env` file and paste your token

Create (or edit) a file named `.env` in the project root so it contains only:

TOKEN=DISCORD_BOT_TOKEN
````
---

## Usage

```bash
$ node index.js
```

1. After the bot logs in, all **global** slash commands are listed.
2. You are offered two options:

   1. **Delete only global commands**
   2. **Delete global + every guild‑scoped command**
3. Pick an option—once the wipe finishes the script exits automatically.

> **Propagation delay:** Global command updates can take 10–60 minutes to reach every Discord client. Guild‑scoped changes are nearly instantaneous.

---

## FAQ

### Why didn’t the commands disappear immediately?

Global commands are cached on Discord’s CDN; total invalidation can take up to an hour. Guild‑scoped commands usually vanish within seconds.

### I’m getting “Missing Access / 50001” errors

Invite the bot with the **applications.commands** scope and ensure it has sufficient permissions in each guild.

---

## Contributing

Pull requests and issues are welcome! Please respect the existing code style—run `npm run lint` before submitting (if you add ESLint).

---

## Disclaimer

This script is provided **as‑is**. The author(s) accept **no liability** for data loss, misconfiguration, or account restrictions that may result from its use. You run it **entirely at your own risk**—always back up production environments first.

---

## License

Released under the **GNU General Public License v3.0** (GPL‑3.0). See [`LICENSE`](LICENSE) for full terms.
