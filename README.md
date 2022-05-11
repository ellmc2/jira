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
