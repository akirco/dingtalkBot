const { excuteSqlConn } = require('../utils/sql');
const ChatBot = require('dingtalk-robot-sender');

async function getBots(callback) {
  const bots = await excuteSqlConn(`SELECT * FROM bot`);
  callback(bots);
}

function setDingTalkBot(bots) {
  bots.map((bot) => {
    bot = JSON.parse(JSON.stringify(bot));
    const robot = new ChatBot(bot);
  });
}

getBots(setDingTalkBot);
