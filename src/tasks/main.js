const { excuteSqlConn } = require('../utils/sql');
const ChatBot = require('dingtalk-robot-sender');

//查询bot信息
async function getBots(callback) {
  const bots = await excuteSqlConn(
    `select * from bot,jobs where bot.botId=jobs.botId and jobs.complete=0;`
  );
  callback(bots);
}
getBots(setDingTalkBot);

//初始化bot
function setDingTalkBot(bots) {
  bots.map((bot) => {
    bot = JSON.parse(JSON.stringify(bot));
    // console.log(JSON.parse(JSON.stringify(bot)));
    createBot(bot);
  });
}

//处理机器人消息
async function createBot(bot) {
  if (bot.complete === 1) {
    return;
  }
  const robot = new ChatBot(bot);
  await sendMarkdown('每日早报', robot, bot);
  await sendText(robot, bot);
}

//发送文本消息
async function sendText(robot, bot) {
  for (let key in bot) {
    if (key.startsWith('txt')) {
      let index = key.replace(/[^0-9]/gi, '');
      let currentTxt = `txt${index}`;
      const textContent = {
        msgtype: 'text',
        text: {
          content: bot[currentTxt],
        },
      };
      await robot.send(textContent).then(() => {
        console.log('文本发送成功了!');
      });
    }
  }
}

//发送markdown消息
async function sendMarkdown(title, robot, bot) {
  for (const key in bot) {
    if (key.startsWith('img')) {
      let index = key.replace(/[^0-9]/gi, '');
      let currentImg = `img${index}`;
      if (bot[currentImg] !== '') {
        let rawMarkdown = '![](http:localhost:4000/static/' + bot[currentImg] + ')';
        await robot.markdown(title, rawMarkdown, {}).then(() => {
          console.log('Markdown发送成功！');
        });
      }
    }
  }
}
