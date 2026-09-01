# Judd Game Night

The shared front door for the Judd family game collection. It keeps a single persistent table chat beside each game and is ready for the collection to grow.

## Start it

```text
npm start
```

Then open `http://127.0.0.1:8080`.

## Add the two games

Place each game at the paths configured in `games.config.js`:

```text
games/
  five-crowns/
  three-handed-rook/
```

The existing Three-Handed Five Crowns game can be copied into `games/five-crowns/`. The launcher will open games in its own view while the Game Night chat stays alive beside it. If a game is hosted elsewhere, replace its `path` in `games.config.js` with the full `https://` URL (provided the hosted game allows framing).

## Add future games

Add an object to `window.JUDD_GAMES` in `games.config.js`; give it an `id`, title, subtitle, path, and icon key. The hub already has `crowns` and `rook` icon treatments; future games can add one small CSS art block without changing the rest of the launcher.

Chat history is stored locally in `data/chat.json`, keeping up to the latest 150 messages.
