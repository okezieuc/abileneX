export default function handler(req, res) {
  if (req.headers.authorization === process.env.zoom_verification_token) {
    res.status(200);
    res.send();

    // start

    let response = fetch("https://api.zoom.us/oauth/data/compliance", {
      method: "POST",
      body: {
        client_id: req.body.payload.client_id,
        user_id: req.body.payload.user_id,
        account_id: req.body.payload.account_id,
        deauthorization_event_received: req.body.payload,
        compliance_completed: true,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.zoom_client_id + ":" + process.env.zoom_client_secret
          ).toString("base64"),
        "cache-control": "no-cache",
      },
    });

    if (response.ok) {
      console.log(response.body);
    } else {
      console.log(response.error);
    }
    // end
  } else {
    res.status(401);
    res.send("Unauthorized request to abileneX Chatbot for Zoom.");
  }
}

/*
request(
      {
        url: "https://api.zoom.us/oauth/data/compliance",
        method: "POST",
        json: true,
        body: {
          client_id: req.body.payload.client_id,
          user_id: req.body.payload.user_id,
          account_id: req.body.payload.account_id,
          deauthorization_event_received: req.body.payload,
          compliance_completed: true,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.zoom_client_id + ":" + process.env.zoom_client_secret
            ).toString("base64"),
          "cache-control": "no-cache",
        },
      },
      (error, httpResponse, body) => {
        if (error) {
          console.log(error);
        } else {
          console.log(body);
        }
      }
    );
*/
