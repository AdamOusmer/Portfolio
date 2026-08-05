---
title: "The Bagel Logs"
description: "Over-engineering a Twitch Bot"
pubDate: 2026-05-20T00:00:00-04:00
heroImage: "/itsbagelbot/BagelBot-Logo.png"
---

It all started with a ridiculously simple request. A friend of mine wanted a way to handle Spotify song requests
directly through their Twitch chat.

About three years ago, I found myself running four different bots simultaneously on a single Twitch channel just to
cover all the features I wanted. One for alerts, one for custom commands, one for moderation, another for song requests.
Each had its own dashboard, its own quirks, and its own way of randomly going offline at the worst possible moment,
usually mid-stream. I remember thinking: *"There has to be a better way."*

So I did what any reasonable software engineering student would do. I decided to build my own Twitch bot.

And then I *kept building*.

## 1. Introduction

Initially, I had made my own little [Python script](https://github.com/AdamOusmer/twitchtify) to handle Spotify song
requests. A simple CLI system with a little `.env` file. Nothing fancy, nothing extraordinary, but it was working. Just
a little IRC connection with the TwitchIO library. The fuzzy search was not great, but it was working 90% of the time.

I was happy with it.

When my friend asked me for it, I simply reused it, installed my dependencies, started the script... To my surprise,
nothing was working. The issue was that the dependencies I had used were deprecated, and TwitchIO had moved away from
IRC toward Helix. Someone might say: "Just reinstall the latest version with IRC support."

But I wasn't happy with it anymore.

I had been studying software engineering for years. I was reaching the end of my studies. I had more knowledge of
hosting and had always planned to make my own Twitch bot for my own channel. This was the perfect occasion to build
something fun that everyone could use.

So... I did.

## 2. The Monolithic Spaghetti

We were in November. A month before finals. It is a really busy time to code anything with multi-tenancy. However, I was
determined to have a better and more unique project in my portfolio, in addition to the independent research and the
work done with Space Concordia.

To be able to focus properly on my examinations, I leveraged AI to help me code and build the bot. I did some research,
had a general idea of how it should work, and planned on leveraging my old scripts. I delegated the code and the
architecture to an AI. The boost in productivity was amazing. It was iterating so fast, had my WebSockets working
properly, and had my fuzzy search done in minutes. Commands and modules were built in a single night.

But I started building for a single user.

The AI had the task of building for a single user. I thought that starting with one channel and then allowing other
people to join once the bot was fully ready would make it easier and faster.

How wrong I was.

Everything was terminal-based and built around one user. The AI produced code that was so tightly coupled that a single
change in one file cascaded into changes in seven others. Everywhere in the code, from the consumers to the base
modules, everything needed everything else in a specific way. I was not using any design patterns, and the AI didn't
even have access to the project, meaning that I was pasting files one by one into the browser, killing the agent's
context.

## 3. The Distributed TakeOff

I quickly realized that trying to scale this tightly coupled, terminal-bound Python monolith into a multi-tenant
platform was a recipe for disaster. The AI had done exactly what I asked, but without the wider context of my
architectural goals, it built a house of cards. I needed a system where a failure in one module wouldn't bring down the
entire stream. I needed true decoupling.

So, I threw out the monolithic design and started from scratch.

The first major tradeoff was leaving Python behind. While Python is fantastic for quick scripts and prototypes, its
Global Interpreter Lock (GIL) quickly became a massive roadblock. Because the GIL prevents multiple native threads from
executing Python bytecodes simultaneously, handling highly concurrent, real-time Twitch chat events effectively meant
being bottlenecked by a single CPU core. Trying to hack around it with multiprocessing was exactly the kind of overhead
I wanted to avoid.

I looked into the alternatives. While experimental no-GIL Python builds (like those available via `uv`) exist, they just
aren't stable enough yet to handle this kind of high-throughput production load. Another option was brute-forcing
horizontal scalability—using KEDA to dynamically spin up new pods to balance the load and bypass the GIL entirely. The
problem? Python's startup time is simply too slow. When a massive raid hits a Twitch channel, you can't afford sluggish
cold starts; you need a system that can react instantly. Trying to hack around these limitations was exactly the kind of
operational overhead I wanted to avoid.

Beyond the language-level constraints, the framework itself was fighting me. I had originally built on top of TwitchIO,
which was fine for a simple script but proved fatal for a resilient platform. It heavily abstracted the network layer,
meaning it didn't give me direct access to the websockets. Worse, it lacked proper `session_reconnect` logic and offered
absolutely no way to reliably check the actual status of the socket. If a connection silently dropped, the bot just sat
there, completely in the dark.

## 4. Infrastructure & Cluster Topology

## 6. What's Next & Lessons Learned

## 7. Conclusion 



