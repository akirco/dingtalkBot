const ChatBot = require('dingtalk-robot-sender');
const dingTalkBot = require('./config');
const robot = new ChatBot(dingTalkBot);

async function sendText(text) {
  const textContent = {
    msgtype: 'text',
    text: {
      content: text,
    },
  };
  robot.send(textContent).then((res) => {
    console.log('文本发送成功了');
  });
}

async function sendImage(img) {
  const card = {
    text: `${img}`,
  };
  robot.actionCard(card).then((res) => {
    console.log('图片发送成功！');
  });
}

async function sendMarkdown(title, rawMarkdown) {
  robot.markdown(title, rawMarkdown, {}).then((res) => {
    console.log('Markdown发送成功！');
  });
}

module.exports = { sendText, sendImage, sendMarkdown };
