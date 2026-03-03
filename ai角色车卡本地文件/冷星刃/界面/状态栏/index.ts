import './加载和卸载时执行函数';
import './设置界面';

$(() => {
  const app = createApp(设置界面).use(createPinia());

  const $app = createScriptIdDiv().appendTo('#extensions_settings2');
  app.mount($app[0]);

  const { destroy } = teleportStyle();

  $(window).on('pagehide', () => {
    app.unmount();
    $app.remove();
    destroy();
  });
});
