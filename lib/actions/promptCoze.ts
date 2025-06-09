type promptProps = {
  userMessage: string;
}

const promptCoze = async ({ userMessage }: promptProps) => {
  const res = await fetch('https://api.coze.com/open_api/v2/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer pat_axUaOnslRyQEGn7PbaMfxc9KkFEqKtLQzXd050odrxgl4fcYTD6gHsm7U2sGRcql`,  // your Coze token
    },
    body: JSON.stringify({
      bot_id: process.env.COZE_BOT_ID,       // get this from your Coze dashboard
      user: 'unique_user_id',                // e.g. session.user.id
      query: userMessage,                    // the user’s message
      stream: false                          // set true for streaming responses
    }),
  });

  const data = await res.json();
  if (res.status !== 200 || data.code !== 0) {
    const errMsg = data.msg || `HTTP ${res.status}`;
    throw new Error(`Coze API error: ${errMsg}`);
  }

  return data.messages[0].content || 'An error has occured';
};

export default promptCoze;
