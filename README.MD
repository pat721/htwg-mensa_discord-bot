# HTWG-MENSA-BOT for Discord

A very simple bot, that scrapes the htwg mensa website and extracts the meals to display them in discord.

# Setup

Just host the node application with an environment variable "BOT_TOKEN" that has your discord bot's token as the value.

# Commands

- !mensa-help to let the bot list all possible commands. (basically this list)
- !mensa [today/tomorrow] - lists all meals that are available today/tomorrow.
- !main or !seezeit-teller [sides] [today/tomorrow] - lists the main meal (Seezeit-Teller) from today or tomorrow.
- !hinweg [sides] [today/tomorrow] - lists the hin&weg meal from today or tomorrow.
- !option or !kombinierbar [sides] [today/tomorrow] - lists the option meal (KombinierBar) from today or tomorrow.
- !pasta [vegie] [today/tomorrow] - lists the pasta meal, vegetarian or meat, from today or tomorrow.
- !sides [today/tomorrow] - lists all the sides from today or tomorrow.

NOTE: All Parameters in Brackets [ ] are optional and extend the basic output (e.g. get the seezeit-teller with sides of tomorrow)

# TODO and Feature List

- [x] request all available menus
- [x] request main menu (seezeit-teller)
- [x] request option menu (kombinierbar)
- [x] request regular/vegetarian pasta menu
- [x] request sides (beilagen)
- [x] requests for today or tomorrow
- [x] request combinations (e.g. main with sides of tomorrow)
- [ ] beautify and refactor code
- [ ] reduce branching
- [ ] move to more modern slash-commands
- [ ] add setup guide
