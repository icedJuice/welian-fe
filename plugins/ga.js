/*
** 只在生成模式的客户端中使用
*/

export default ({ app: { router }, store }) => {
  if (process.env.NODE_ENV === 'production') {
    /*
    ** Google 统计分析脚本
    */
  }
};
