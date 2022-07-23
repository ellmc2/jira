# JIRA

技术栈：React、TypeScript、React Query、React Router、Redux Toolkit、CSS in JS 等

项目功能：

- JWT 登陆注册
- 项目列表、详情、编辑、删除
- 任务列表/排序
- 看板列表/排序等

项目演示地址（待添加）

技术概念：乐观更新

## 0 初始化项目

```bash
npx create-react-app jira --template typescript
```

```markdown
# 项目目录结构

.
├── README.md
├── node_modules
├── package-lock.json # 锁定版本号
├── package.json # 前段项目的入口文件
├── public # 不参与打包
│   ├── favicon.ico
│   ├── index.html # src 文件夹下的文件打包后，给 index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json # PWA，配置 pwa 的加载情况
│   └── robots.txt # 配置搜素引擎爬虫如何处理本项目
├── src # 参与打包
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx # 项目 APP 本身
│   ├── index.css
│   ├── index.tsx # 项目入口文件，一般会做一些准备工作
│   ├── logo.svg
│   ├── react-app-env.d.ts # 引入预先定义好的 typescript 类型
│   ├── reportWebVitals.ts # 埋点上报
│   └── setupTests.ts # 配置单元测试
└── tsconfig.json # 配置 TS
└── .gitignore # git 版本忽略文件
```

### 0.1 解决项目中写绝对路径时 TS 报错问题

```
TS2307: Cannot find module 'filename' or its corresponding type declarations.
```

```md
# 在 tsconfig.json 中添加编译配置"baseUrl"

{
"compilerOptions": {
"baseUrl": "./src"
}
}
```

### 0.2 [统一代码格式化风格](https://www.prettier.cn/docs/install.html)

```bash
# 安装prettier
npm install --save-dev --save-exact prettier
# 添加配置文件
echo {}> .prettierrc.json
# 添加.prettierignore文件
touch .prettierignore
# 并添加内容
# Ignore artifacts:
build
coverage
```

### 0.3 [提交前自动格式化](https://www.prettier.cn/docs/precommit.html)

```bash
npx mrm@2 lint-staged
# 更新package.json中 lint-staged字段
"lint-staged": {
  "*.{js,css,md,ts,tsx}": "prettier --write"
}
```

### 0.4 [解决 eslint 与 prettier 的冲突](https://www.prettier.cn/docs/integrating-with-linters.html)

```bash
npm install --save-dev eslint-config-prettier
# 并更新package.json中的eslintConfig中的extends
```

### 0.5 [规范提交时 commit msg](https://github.com/conventional-changelog/commitlint#getting-started)

```bash
npm install --save-dev @commitlint/{config-conventional,cli}
# 添加配置文件
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# 添加hook
cat <<EEE > .husky/commit-msg
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

npx --no -- commitlint --edit "\${1}"
EEE
# 确保hook可以被执行
chmod a+x .husky/commit-msg

# commit type enum
[
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
];
```

### 0.6 Mock 方案

REST API： URI 代表 资源/对象 ，METHOD 代表行为

- GET /tickets // 列表
- GET /tickets/12 // 详情
- POST /tickets // 增加
- PUT /tickets/12 // 替换
- PATCH /tickets/12 // 修改
- DELETE /tickets/12 // 删除

#### 0.6.1 MOCK 方案之[JSON Server](https://github.com/typicode/json-server#getting-started)

```bash
# 安装json server
npm install -g json-server
# 创建db.json文件
touch db.json

# 启动json-server
json-server --watch db.json

# 若post请求只能添加id，name添加不进去啊，进入db文件里面只有一个id。修改POSTMAN中Body中content-type设置成application/json

# 在项目中添加json-server
npm install --save-dev json-server
# 在项目中新建文件夹__json_server_mock__
# __两个下划线表示查看代码的人，该文件夹与该项目关联不大，只是一个辅助的存在
mkdir __json_server_mock__
cd __json_server_mock__
touch db.json

# 在package.json中添加脚本
"json-server": "json-server __json_server_mock__/db.json --watch"
```

注 1：encodeURI 用于转义整个 URI 的，encodeURIComponent 用于转义 URI 的一部分。

注 2：screens 文件夹为整个页面的代码

注 3：

```bash
# 当执行 npm run start 时， process.env.paramName 值为 .env.development 文件中 paramName 变量值
# 当执行 npm run build 时，process.env.paramName 值为 .env 文件中 paramName 变量值
```

### 0.7 安装 `qs`

```bash
yarn add qs
```

### 0.8 使用 customHook 提取组件业务逻辑，复用组件代码

注 1：使用 customHook 时一定要以 `use` 开头，这样 `eslint` 才会知道书写的函数为一个 hook。

注 2：无论是 React 自带的 hook 还是 customHook 都是不可以在普通函数中运行的， 它只能在其他 hook 中运行或者组件中运行

### 0.9 使用 `ts ` 的必要性

> 使用 `JS ` 时，大部分错误都在 runtime(运行时)才能被发现。
>
> 我们希望，在静态代码中就能发现其中的一些错误，强类型。

```typescript
// never 类型
const fn: () => never = () => throw new Error();
```

> js 文件 + .d.ts 文件 === ts 文件

```tsx
// unknown 类型
unknown 类型的值不能赋值给任何其他类型的值
```

> TS 是鸭子类型(duck typing)：面向接口编程，而不是面向对象编程。

```markdown
// vs code 快捷键
快速删除一行 command + shift + k

移动当前行向上/下 option + ⬆️/⬇️
当前行向上/下复制一行 option + shift + ⬆️/⬇️

# 光标操作

跳转行头 fn + ←
跳转行尾 fn + ➡

向上新增一行，并跳转上一行 command + shift + enter
```

通过 json-server 中间件，实现对于非 restful api 支持。

### 0.10 安装 `npx imooc-jira-tool`

```bash
npx imooc-jira-tool
```

```tsx
const login = (form: AuthForm) =>
  auth.login(form).then((user) => setUser(user));
// 可以简写成下面👇这种形式
const login = (form: AuthForm) => auth.login(form).then(setUser);
```
