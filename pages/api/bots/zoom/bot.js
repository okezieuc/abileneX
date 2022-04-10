import getUserIdFromZoomAccountId from "utils/getUserIdFromZoomAccountId";
import { supabaseServiceClient } from "utils/supabaseServiceClient";

export default function handler(req, res) {
  console.log(req.body);
  createPoll();

  async function createPoll() {
    const creator_id = await getUserIdFromZoomAccountId(
      req.body.payload.userId
    );

    function getCommandAndBody(cmd) {
      const splitCmd = cmd.split(" ");
      if (splitCmd.length == 1) {
        return {
          command: splitCmd[0],
          body: null,
        };
      } else {
        return {
          command: splitCmd[0],
          body: cmd.replace(splitCmd[0] + " ", ""),
        };
      }
    }

    const cAB = getCommandAndBody(req.body.payload.cmd);

    if (cAB.command == "create") {
      // create entry for new pool in supabase database
      const { data, error } = await supabaseServiceClient.from("polls").insert([
        {
          creator_id,
          accepting_votes: true,
          title: cAB.body,
        },
      ]);

      if (!error) {
        getChatbotToken({
          head: {
            text: "abileneX",
          },
          body: [
            {
              type: "message",
              text: "You sent " + req.body.payload.cmd,
            },
          ],
        });
      } else {
        console.error("Failed to create poll");
      }
    }
    if (cAB.command == "end") {
      // get the last created poll
      const { data: latestPollData, error } = await supabaseServiceClient
        .from("polls")
        .select("poll_id")
        .order("created_at", {
          ascending: false,
        })
        .limit(1);

      if (latestPollData.length == 1) {
        const { data, error } = await supabaseServiceClient
          .from("polls")
          .update({ accepting_votes: false })
          .match({ poll_id: latestPollData[0].poll_id });

        getChatbotToken({
          head: {
            text: "abileneX",
          },
          body: [
            {
              type: "message",
              text: "Ended " + latestPollData[0].poll_id,
            },
          ],
        });
      }

      /*
      
      checkPollAcceptingVotes();
      */
    }
  }

  async function getChatbotToken(content) {
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
      sendChat(body.access_token, content);
    } catch (err) {
      console.log("Error getting chatbot_token from Zoom.", err);
    }
  }

  async function sendChat(chatbotToken, content) {
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
            content: content,
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
