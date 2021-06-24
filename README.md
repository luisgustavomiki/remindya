# remindya

Reminds people of stuff.

## Check it out

1. Clone and `docker-compose up`
2. Go to https://www.websocket.org/echo.html, connect to WebSocket server, usually at `ws://127.0.0.1:8080`
3. Put a reminder by sending this message `{ "action": "create-reminder", "body": { "target": "2021-06-24T00:03:38.000Z", "message": "Drink water." } }`
   
## TODO

* Set up environment configs.
* Improve logging and error handling.
* Decouple services from their implementation.
* Integration tests.
