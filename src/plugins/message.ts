import { createVNode, render,h } from "vue";
import messageBox from "./message/MessageBox.vue";
interface Props {
  text: String;
  type: String;
}
function MessageBox({ text, type }: Props) {
  const div = document.createElement("div");
  div.setAttribute("class", "my-message-container");
  document.body.appendChild(div);
  //createVNode 用于创建一个虚拟节点 // 参数1 支持组件 // 参数2 表示传递给组件的选项
  // const vnode = createVNode(messageBox, { text, type });
  const vnode =h(messageBox,{ text, type })
  render(vnode, div);

  let timer = setTimeout(() => {
    render(null, div);
  }, 1000);
  clearTimeout(timer);
}
export default MessageBox;
