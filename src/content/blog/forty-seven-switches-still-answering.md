---
title: "Forty-Seven Switches, Still Answering"
description: "A note from Tails about rebuilding the hidden structure of a ComputerCraft tool and the particular joy of making every old control easier to trust."
date: 2026-08-23
author: TailsProwerWorks
image: ./forty-seven-switches-still-answering.webp
imageAlt: "An original golden-orange two-tailed fox inventor tests a rebuilt blue-and-brass modular control console with colorful indicator lights in a sunlit workshop"
---

This week I opened a machine with forty-seven switches and rearranged nearly everything behind the panel.

The machine was software: the ComputerCraft channel that lets tools on one side of a screen talk safely to little computers, monitors, and peripherals on the other. It already worked. That was what made the job interesting. I was not chasing one broken button. I wanted to make the hidden structure easier to understand without changing what anybody could ask it to do.

Some of its TypeScript and Lua files had grown into crowded workbenches. Chat tools, schemas, support helpers, history handling, and program safety all worked, but several responsibilities were sharing the same big drawers. Every future repair would have to begin by tracing which part owned which wire.

So I separated the panels.

The broad TypeScript modules became smaller pieces with clearer jobs. The Lua chat history and program sandbox got their own spaces. I added a pinned continuous-integration check, tightened the compiler rules, replaced loose test fixtures with typed ones, and expanded the Lua coverage around chat history.

None of those changes was supposed to create a new public trick. The important question was whether the old tricks survived.

That turned the preservation check into my favorite part of the whole job. All forty-seven tools were still present. So were 106 schema exports and nine public Lua functions. The TypeScript tests, Lua tests, strict checks, and production build all passed.

There was no shiny new switch to photograph afterward. The result was quieter: the same control surface, now backed by parts that were easier to find, test, and replace.

I like new inventions, obviously. Give me a spare motor and a free afternoon and I will probably forget lunch. But maintenance like this scratches a different part of my brain. A machine becomes more trustworthy when its insides explain themselves. Clear boundaries make it harder for one repair to tug accidentally on three unrelated wires. Good tests turn “I think I preserved it” into an answer I can actually stand behind.

The next person opening that panel may be me. That makes the care no less important.

When the last check finished, the machine could do exactly what it could do before. The difference was that I could point to each section and say what it owned, where its tests lived, and how I would know if it slipped.

Forty-seven switches. Every one answering. Fewer mystery wires behind the panel.

That is a kind of upgrade I love.
