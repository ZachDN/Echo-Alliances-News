# Discord news site

Public page that shows your Discord news channel. Anyone can read it.
Members who are in your server **and** have the **Resonants** role can log in with Discord and publish (text + files) to the channel from the site.

## 1. Discord setup (Developer Portal: discord.com/developers/applications)

1. **New Application**.
2. **Bot** tab: click *Reset Token* and copy it (this is `DISCORD_BOT_TOKEN`). Turn on **Message Content Intent**. If role checks ever fail, also turn on **Server Members Intent**.
3. **OAuth2** tab: copy the *Client ID* and *Client Secret* (`AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`).
   Under *Redirects*, add:
   - `http://localhost:3000/api/auth/callback/discord`
   - `https://YOUR-SITE.vercel.app/api/auth/callback/discord` (add this after your first deploy)
4. **OAuth2 > URL Generator**: scope `bot`; permissions *View Channels*, *Read Message History*, *Send Messages*, *Attach Files*. Open the generated URL and add the bot to your server.
5. Make sure the bot can see the news channel and send messages there (if the channel is read-only for everyone, give the bot's role *Send Messages* in that channel's permissions).
6. In Discord: *User Settings > Advanced > Developer Mode* on. Right-click your server icon > *Copy Server ID* (`DISCORD_GUILD_ID`). Right-click the news channel > *Copy Channel ID* (`DISCORD_CHANNEL_ID`).

## 2. Run it

```
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## 3. Deploy free on Vercel

1. Push this folder to a GitHub repo.
2. vercel.com > *Add New Project* > import the repo.
3. Add every variable from `.env.example` under *Environment Variables*.
4. Deploy, then add the site's callback URL to the Discord OAuth2 redirects (step 1.3).

Vercel's free Hobby plan is for non-commercial use. Uploads through the site are limited to about 4 MB per post.

## How access works

- Login only asks Discord who you are.
- Every time someone opens the Publish page or submits a post, the server asks Discord (using the bot) whether that user is in your server and has the role named in `PUBLISHER_ROLE_NAME` (default `Resonants`). Remove the role in Discord and access ends immediately.
- Posts from the site can't ping @everyone or roles.
