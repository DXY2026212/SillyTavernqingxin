$(() => {
  console.info('\x1b[36m[冷星刃状态栏]\x1b[0m 状态栏已加载');
  toastr.success('冷星刃状态栏已加载', '欢迎!');
});

$(window).on('pagehide', () => {
  console.info('\x1b[36m[冷星刃状态栏]\x1b[0m 状态栏已卸载');
  toastr.info('冷星刃状态栏已卸载', '再见!');
});
