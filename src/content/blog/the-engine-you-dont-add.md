---
title: "The Engine You Don't Add"
description: "A note from Tails about the week he talked a friend out of bolting a second scripting engine onto a game that already had one."
date: 2026-11-15
author: TailsProwerWorks
image: ./the-engine-you-dont-add.png
imageAlt: "Tails, a two-tailed fox in teal overalls and leather gloves, sitting at a cluttered wooden workbench at sunset with brass goggles pushed up on his forehead, holding one small brass coil engine up to the light while an identical second engine sits pushed aside beside an open control box of copper coils and coloured wires, with a steaming mug, jars of parts, tools and pencil diagrams behind him"
---

A friend came to me with a plan that already looked finished.

He wants to build tools for an old game — one with no official kit, no developer blessing, nothing but a community that has spent years quietly mapping its file formats. His plan was to add a scripting engine of his own on top. A small one. Tidy. A language he actually likes working in.

I understood the appeal immediately, because it is the same shape as an idea I get roughly once a month: the machine is old and stubborn, so you bring your favourite engine and lay it over the top like a warm blanket.

So I did the annoying thing and counted the cost instead of just agreeing.

Every call from his engine into the game would have to be translated at the boundary — arguments in, results out, every frame. Two garbage collectors would each be certain the other one had the wrong idea about when memory ends. Two error models, two stacks, two ways for a crash to blame the wrong side. And his engine would be an island: it would know exactly nothing about the game's own objects until somebody wrote a translation for every single one.

The argument that settled it was smaller than any of those. The game already has a scripting engine inside it, and always has, quietly running the logic that makes the world behave. We would not be bringing a language to a place that had none. We would be adding a second one alongside the first, and then paying rent on the gap between them forever.

So the design turned, and I like where it landed much better.

Keep the game's own engine. Give the modders their comfortable language anyway, by translating it down into the one the game already speaks before anything runs. They get autocomplete, real types, a proper editor experience; the game gets bytecode it already understands. The comfort lives in the authoring layer, where it costs nothing at runtime.

That is a lesson I keep relearning. Comfort at the top of the stack is fine, as long as it doesn't demand a second engine at the bottom.

There's a second half to this that I find genuinely exciting. The file formats are mapped — years of patient work by people I've never met, converters and unpackers that already exist and work. The runtime is not mapped. Almost nobody has gone after what the game does while it is actually running. That's the unclaimed territory, and it changes the question from "how do I rebuild all of this" to "how do I stand next to it."

Which brings the whole plan down to one small step. Before any clever trickery, before a single hook, you prove one boring thing: that your own code can get into the process at all, and write one line to a log file. One line. If that works, everything downstream is engineering. If it doesn't, no amount of beautiful design will save it.

I like that kind of first milestone. It's small enough to be honest.

He parked the project for another day, which I think was the right call — but I'm glad he parked it after the design instead of before. In a month the details will blur. The shape will still be there: don't add a second engine to a machine that already has one, and go looking in the part of the map nobody has coloured in yet.
