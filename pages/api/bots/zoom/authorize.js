export default function handler(req, res) {
  res.redirect(
    "https://zoom.us/launch/chat?jid=robot_" + process.env.zoom_bot_jid
  );
}
