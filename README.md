# Stood Bot

A Telegram bot that automatically posts a personal update in your selected chats. All members of a chat can participate!

## How to use

1. Add [@stood_bot](https://t.me/stood_bot) to the chats you want your updates to be posted to
2. Type `/subscribe` in each of those chats

## Info

* Reminder to submit an update sent at 10am est
* Update posts at 11am est

## Support

[Create a GitHub issue](https://github.com/alwaysbegrowing/telegram-standup-bot/issues/new/choose) if you are having problems with the bot.

### Self Hosting Setup

1. Install Vercel CLI
```yarn global add vercel```

2. Setup the project with vercel
`vercel deploy` // accept all the default settings

3. Create a telegram bot with botfather - <https://core.telegram.org/bots#6-botfather>

4. Add your telegram bot API key as an env variable
`vercel env add TELEGRAM_API_KEY` // then enter your TG API get obtained in step 3

5. Create a database instance with mongodb atlas. Name your database `standup` - <https://www.mongodb.com/cloud/atlas>

6. Add your MONGODB URI as an env variable
`vercel env add MONGODB_FULL_URI`// then enter your mongodb connection URL obtained in step 2

7. Pull down the env variables as a local .env file for local development
`vercel env pull`

8. Setup a webhook to your vercel standup URL <https://core.telegram.org/bots/webhooks> (example URL: `https://bla-vercel.com/api/standup`).
   
   `https://api.telegram.org/bot${TELEGRAM_API_KEY}/setWebhook?url=https://.../api/standup?key=${TELEGRAM_API_KEY}`
   
   This is how your bot will know when events happen inside of telegram

### Sample crontab

```crontab
0 10 * * * curl -s https://.../api/reminder?key=TELEGRAM_API_KEY
0 11 * * * curl -s https://.../api/send?key=TELEGRAM_API_KEY
```

### Local development

```bash
yarn
vercel dev
```

* <https://core.telegram.org/bots/webhooks> - You can use these example webhooks to test your bot locally with curl or postman.
* If you want to see the exact format of your webhooks - you can set your webhook url to <http://webhook.site/> for testing.
* If you wanted to test your bot fully locally, you can run the application with `vercel dev` then setup ngrok on the deployment URL - <https://ngrok.com/docs> then setup your webhooks to go to the ngrok url. (Note, ngrok has rate limiting, so some webhooks may be delayed or not sent)

This runs the website at localhost:3000 and runs your lambda functions in the /api folder on localhost:3000/api
More info on how this works - <https://vercel.com/docs/serverless-functions/introduction>

### Troubleshooting

If your messages or commands aren't going through check if you have any pending updates, read the error is, then clear them

You might have to fix the error, or it'll happen again

```md
https://api.telegram.org/bot${TELEGRAM_API_KEY}/getWebhookInfo

https://api.telegram.org/bot${TELEGRAM_API_KEY}/deleteWebhook?drop_pending_updates=true
```

View your function logs in vercel. Visit vercel.com, login, navigate to your bot, click on your functions, then view the function logs.

---

<center>
<a href="https://vercel.com?utm_source=alwaysbegrowing&utm_campaign=oss"><img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"/></a>
</center>
