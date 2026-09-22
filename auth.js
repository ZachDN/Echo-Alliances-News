import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

// Login only asks Discord "who is this?" (identify).
// Role membership is checked separately, on the server, with the bot.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Discord({ authorization: { params: { scope: "identify" } } })],
  callbacks: {
    jwt({ token, profile }) {
      if (profile?.id) token.discordId = profile.id;
      return token;
    },
    session({ session, token }) {
      session.user.discordId = token.discordId;
      return session;
    },
  },
});
