import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import getUserIdFromZoomAccountId from "utils/getUserIdFromZoomAccountId";

export default function handler(req, res) {
  console.log(req.body);
  createPoll();

  async function createPoll() {
    const creator_id = await getUserIdFromZoomAccountId(
      req.body.payload.userId
    );

    // create entry for new pool in supabase database
    const { data, error } = await supabaseClient.from("polls").insert([
      {
        creator_id,
        accepting_votes: true,
        title: req.body.payload.cmd,
      },
    ]);

    if (!error) {
      getChatbotToken();
    } else {
      console.error("Failed to create poll");
    }
  }

  async function getChatbotToken() {
    try {
      let tokenFetchResponse = await fetch(
        `https://zoom.us/oauth/token?grant_type=client_credentials`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.zoom_client_id +
                  ":" +
                  process.env.zoom_client_secret
              ).toString("base64"),
          },
        }
      );
      const body = await tokenFetchResponse.json();
      console.log(body);
      sendChat(body.access_token);
    } catch (err) {
      console.log("Error getting chatbot_token from Zoom.", err);
    }
  }

  async function sendChat(chatbotToken) {
    try {
      console.log("sending message");
      const sendChatRequest = await fetch(
        "https://api.zoom.us/v2/im/chat/messages",
        {
          method: "POST",
          body: JSON.stringify({
            robot_jid: process.env.zoom_bot_jid,
            to_jid: req.body.payload.toJid,
            account_id: req.body.payload.accountId,
            content: {
              head: {
                text: "abileneX",
              },
              body: [
                {
                  type: "message",
                  text: "You sent " + req.body.payload.cmd,
                },
              ],
            },
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + chatbotToken,
          },
        }
      );
      const response = await sendChatRequest.json();
      console.log(response);
      // console.log(sendChatRequest.body);
      console.log("sent message");
    } catch (err) {
      console.log("Error sending chat.", err);
    }
  }

  res.send("Chat received");
}
