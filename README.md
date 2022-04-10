# AbileneX

Link to hosted demo: https://abilenex.vercel.app

\* Other required information for the Supabase Hackathon follow after the whitepaper

## The whitepaper

Fun fact: the best way to get feedback on an idea is not by talking about the idea. It's by voting on the idea **anonymously**.

AbileneX helps you do that.

AbileneX is an idea voting platform that helps you get unbiased opinion on how good an idea is, helping you decide whether or not to implement the idea. Creating a poll on AbileneX is easy as blinking:

1. Click **create poll** on your dashboard.
2. Enter the title of the idea you need feedback on.
3. Share the voting link to the people you need feedback from.
4. Watch the results roll in!

Wait.

Did we tell you that creating a poll on AbileneX can be easier?

When you connect your Zoom account to AbileneX, you will be able to create anonymous polls during a zoom meeting in one step:

1. By typing "/AbileneX start Should we build an anonymous voting app?" (You'll replace "Should we build an anonymous voting app?" with the idea you'll be voting on.)

When you do that, the AbileneX bot will automatically create your poll and will send you a voting link in the chatbox that you can share to the voters.

Easy, right? Yeah, It sure is.

But, there's a little problem. Before Zoom can allow others to use the AbileneX bot connected to my instance of AbileneX at https://abilenex.vercel.app, Zoom requires me to get my app verified and published on the marketplace. And the verification process is a little bit too difficult to be done during a hackathon. If you are interested in enjoying the simplicity of our AbileneX bot, you will have to create your own Zoom API keys and deploy your own instance of AbileneX.

Now, that's not easy, but trust me, it works. Eventually though, we'll get AbileneX verified.

At this point, you may be wondering why we said that deciding whether an idea is good by discussing it as a group is a bad idea. Well, the answer to that lies in a paradox in Social Psychology: the Abilene Paradox. (Yup. That's where we got our name from.) I sense that you are curious about what the Abilene paradox is. Here is a link to a really long video explaining the paradox and how it affects us: https://www.youtube.com/watch?v=icJK89nnf-Y. Here is a link to the [trailer to the video.](https://www.youtube.com/watch?v=HBTcLQt-iAs)

No, seriously. Watch [the longer video](https://www.youtube.com/watch?v=icJK89nnf-Y). It's fun, informative, and can save you from the disaster of building bad ideas.

Now you understand the beauty of AbileneX, I invite you to take a bold step. Are you ready to build with confidence? If yes, visit https://abilenex.vercel.app to get started. If no, well, trying it out at https://abilenex.vercel.app may change your mind.

<!-- include drake meme here (discussing ideas vs using AbileneX) -->

## For the Supabase Hackathon

AbileneX was built on Supabase during the Supabase Hackathon.

### Team Members

- Okezie Chiedozie (okezieuc@github) (okeziechiedozie@twitter)

### Usage Instructions

- Visit https://abilenex.vercel.app.
- Login with Google, or with a username and password
- After logging in, you will atomatically be redirected back to the landing page. This time, you will see **you're set**. Click **Return to my dashboard** to go your dashboard.
- This dashboard is where you will see a list of polls you have created. You can click any of those polls to view the status of the polls.
- Click **Create Poll** to create an AbileneX poll to get feedback on an idea.
- Enter the idea you want to vote on in the textbox provided under **What are we voting on?**. This text will be shown to the people you are receiving feedback from when they visit your voting link. An example is provided as a placeholder.
- Click proceed to continue.
- AbileneX will automatically create a new poll for you.
- Click copy to copy the voting link to clipboard. You will share this link to the people that you want feedback from.
- Click proceed to continue.
- Click **Go to tracking page** to go to the tracking page of the poll you created. It is from this tracking page that you will end the poll and see the results of the poll.
- A counter at the top of the page shows how many votes the poll has received. When you have received sufficient votes and are ready to view the results, click **End poll and view results**. (We set up RLS on Supabase to make this step irreversible).
- AbileneX will end the poll and show you the number of people who voted for points from 1 up till 5, one being that the idea is a bad one, and five being that the idea is amazing.
- When you scroll down, you will see feedback responses. After voting on how good an idea is, your voters have the option to include an optional feedback text to tell you why they think the idea is good or bad, how you can improve your idea, or alternatives that you can consider.
- Click the home icon on the sidebar to return to your dashboard.

### Supabase/PostgreSQL features we used

#### Supabase Database

We store user and poll data on the Supabase PostgreSQL database.

#### Supabase Auth

We use Supabase Auth to sign in users. Users have the option to login with a username and password, or with a Google account. The Zoom bot feature, which is disabled (for reasons explained in the whitepaper above) but complete, uses Supabase Auth too. A user who connects their Zoom account to AbileneX can create AbileneX feedback polls directly from the chatbox of a Zoom meeting. I originally planned to have AbileneX work in Zoom meetings, but I had to disable the feature because of the tedious Zoom Marketplace verification process.

We also use the profile picture and name provided by the auth providers, when connected, to personalize the user experience. In the absence of that, we use a random generated (but fixed for a particular user) profile picture from [Robohash](https://robohash.org)

#### Supabase RLS

We use RLS to restrict view and edit access on polls, allowing only the creator of a poll the priviledge to edit the poll. We also use an RLS policy to prevent the creator of a poll from restarting an ended poll. We also use and RLS policy to prevent a poll creator from seeing the results of a poll when they have not already ended the poll. This helps in keeping up with the anonymity of feedback we wish AbileneX to provide.

### Screenshots
The landing page after you log in
![landing-page-dashboard](https://user-images.githubusercontent.com/53785400/162643272-be1b3d2c-c571-4504-882e-d4f5b70fdd05.png)
Your dashboard
![dashboard](https://user-images.githubusercontent.com/53785400/162643280-1a9e6711-ef2a-45e1-a1e1-a458eeb7500f.png)
The page where you will create polls from
![create-poll-page](https://user-images.githubusercontent.com/53785400/162643285-6fc408ee-a41a-4e2e-a2e4-4650e414d456.png)
Your poll status page
![poll-status-page](https://user-images.githubusercontent.com/53785400/162643288-603e5097-e047-41c6-80a5-55579f9c4122.png)
The page people you share your voting link with will vote from
![voting-page](https://user-images.githubusercontent.com/53785400/162643292-e7522904-22af-429e-8c7b-fe24e27b327a.png)

## TODO
* Build the search feature

### Special thanks to:

- Icons8 illustrations for [their illustrations](https://icons8.com/illustrations) that took the beauty of our UI up a notch.
- [Robohash](https://robohash.org/). We used their image API to generate profile pictures for users signed in with email and password.
- The person who discovered the Abilene paradox. (Btw, his name is Dr. Jerry Harvey)
- The TailwindCSS contributor that rick-rolled this page on their docs: https://tailwindcss.com/docs/aspect-ratio.

Woah. You made it to the end of our whitepaper. You may want to go with supaspeed and create a poll on [your AbileneX dashboard](https://abilenex.vercel.app), or watch [the supa-long Abilene Paradox video](https://www.youtube.com/watch?v=icJK89nnf-Y), or click supa-tiny little star at the top right corner of this page.

Merci.
