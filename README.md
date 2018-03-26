# volkswagenvriend

This is a really simple webhook implementation that gets Dialogflow classification JSON (i.e. a JSON output of Dialogflow /query endpoint) and returns a fulfillment response.

More info about Dialogflow webhooks could be found here: Dialogflow Webhook
[Dialogflow Webhook](https://dialogflow.com/docs/fulfillment)

# Deploy to:
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# What does the service do?
It's a simple echo service that takes `resolvedQuery` and `action` fields from the Dialogflow JSON reponse and echoes them back in into `speech` and `displayTest` fields in the fulfillment JSON.