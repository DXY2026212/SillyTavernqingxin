# tavern_helper_template

酒馆助手编写前端界面或脚本的模板.

## 使用方法

无论哪种方式, 请阅读[教程文档](https://stagedog.github.io/青空莉/工具经验/实时编写前端界面或脚本/)来了解如何使用.

# 执行克隆
git clone https://github.com/DXY2026212/SillyTavernqingxin.git

node tavern_sync.mjs pull 角色卡名称 -f  将酒馆内容拉取到本地  -f 强制拉取

node tavern_sync.mjs push 角色卡名称 -f    将本地内容推送到酒馆  -f 强制推送

node tavern_sync.mjs watch 角色卡名称   -f  监听本地内容的变化并实时推送到酒馆  -f 强制推送

node tavern_sync.mjs bundle 角色卡名称 -f  将本地内容打包到 '导出文件路径' 处

node tavern_sync.mjs update -f  检查并更新本同步脚本  -f 强制更新

pnpm watch 启动监听源代码并编译  在dist文件夹下生成js文件 实时推送到酒馆

输入以下命令来安装代码依赖:
pnpm install
在安装完成后, 我们将会在项目根目录看到名为 node_modules 的文件夹,
这个文件夹中就是我们刚刚通过 pnpm install 安装的第三方库.
编写完毕后, 我们在终端执行 pnpm build 来打包代码
如果该操作执行成功, 则会在 dist 文件夹中找到 pnpm build 对新项目的打包结果:
我们不再运行 pnpm build, 而是运行 pnpm watch    watch意为监听, 也就是说
pnpm watch 会监听项目中的文件变化, 并在变化时自动重新打包代码.
将打包结果实时更新到酒馆

我们的项目是XXXX（你刚才创建的src的文件夹的名称），目前里面已经有制作好的内容，我希望你参考界面模板，界面示例，将该项目改造为能够在酒馆里运行的页面。



## 如果创建为新仓库

在创建好仓库后, 你可以把仓库网址发给 AI, 问 AI 该**怎么启用 `core.symlinks`**, 然后克隆到本地使用; 或者, 你可以游玩 [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN) 来学习 git 分支和合并.

#### `.vscode/launch.json` 文件

由于 `.vscode/launch.json` 文件中填写了你的酒馆地址, 你可能需要运行命令来忽略这个更改, 避免你的云酒馆 ip 地址暴露:

```bash
git update-index --skip-worktree .vscode/launch.json
```

### 示例文件夹

请不要删除`示例`文件夹, AI 需要参考其中的代码; 但你可以在 `webpack.config.ts` 中将 54 行左右的 `{示例,src}/` 改为 `src/` 来避免打包它们.

#### 利用 jsdelivr 实现前端界面或脚本的自动更新

由于你所制作的前端界面或脚本将被打包在 github 仓库中, 你将能用 jsdelivr 链接来访问它们, 而这个链接可以在前端界面或脚本中直接使用.

由此你就可以为用户创建这样一个自动更新的前端界面:

```html
<body>
  <script>
    $('body').load('https://testingcf.jsdelivr.net/gh/lolo-desu/lolocard/dist/日记络络/界面/介绍页/index.html')
  </script>
</body>
```

或一个自动更新的脚本:

```typescript
import 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/酒馆助手/场景感/index.js'
```

更多请见于[文档](https://stagedog.github.io/青空莉/工具经验/实时编写前端界面或脚本/进阶技巧).

### 自动打包、自动更新功能

本仓库在 `.github/workflows` 文件夹中设置了几个 CI 工作流来为你带来自动打包、自动更新功能, 你也可以在网页上方的 `Actions` 中手动运行它们:

**`bundle.yaml`**

- 自动打包 `src` 文件夹中的代码到 `dist` 文件夹中, 并自动递增版本号从而让 jsdelivr 更快更新缓存;
- 自动将 `tavern_sync.yaml` 中[已经配置好了的角色卡、世界书或预设](https://stagedog.github.io/青空莉/工具经验/实时编写角色卡、世界书或预设/)打包成可以被酒馆导入的文件.

**`bump_deps.yaml`**

- 每三天一次, 自动更新第三方库依赖和酒馆助手 `@types` 文件夹.

**`sync_template.yaml`**

- 在你基于模板仓库创建新仓库后, 你的新仓库将不再和模板仓库有关联, 因此我设置了这个工作流用于同步模板仓库的更新 (如编程助手编写规则、MCP、slash_command.txt 文件等):
  - 发现模板仓库更新后, 这个工作流将会自动创建一个 pull request 来同步更新, 而**你需要手动批准 pull request, 因此建议你时常查看 github 的邮件通知;**
  - 如果模板仓库中有文件是你不想继续同步的, 可以在 `.github/.templatesyncignore` 中添加它.

### 打包冲突问题

为了自动更新和打包一些东西, 本项目直接打包源代码在 `dist/` 文件夹中并随仓库上传, 而这会让开发时经常出现分支冲突.

为了解决这一点, 仓库在 `.gitattribute` 中设置了对于 `dist/` 文件夹中的冲突总是使用当前版本. 这不会有什么问题: 在上传后, ci 会将 `dist/` 文件夹重新打包成最新版本, 因而你上传的 `dist/` 文件夹内容如何无关紧要.

为了启用这个功能, 请执行一次以下命令:

```bash
git config --global merge.ours.driver true
```

## 许可证

[Aladdin](LICENSE)
