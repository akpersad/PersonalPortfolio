import { initBotId } from 'botid/client/core';

// Attach BotID's invisible browser challenge to contact form submissions.
// The server side of this check lives in src/app/api/contact/route.ts.
initBotId({
  protect: [
    {
      path: '/api/contact',
      method: 'POST',
    },
  ],
});
