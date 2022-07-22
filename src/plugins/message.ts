//图标
// 文本
import { createVNode, render } from "vue";
import myMessage from "./message/MessageBox.vue";
// 动态创建一个DOM容器
const div = document.createElement("div");
div.setAttribute("class", "my-message-container");
document.body.appendChild(div);
const $message=(text:string, type:string) => {
  let timer = null; //createVNode 用于创建一个虚拟节点 // 参数1 支持组件 // 参数2 表示传递给组件的选项
  const vnode = createVNode(myMessage, { text, type });
  //把虚拟的节点渲染到页面的DOM中即可
  // render函数的参数
  //参数一：表示表示需要渲染的内容（虚拟节点）
  // 参数二：表示渲染的目标位置 （DOM元素）
  render(vnode, div);
  // 希望1s后消失
  timer = setTimeout(() => {
    // 清空div里面的内容
    render(null, div);
  }, 1000);
  clearTimeout(timer);
};
// $message({ text: '登录失败', type: 'error'})
export default $message;