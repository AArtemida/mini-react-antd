# MiniReactAdmin
React + TypeScript + Vite搭建的基础管理系统。

## Features
- [x] 生成动态路由、菜单（react-router v6）
- [x] 支持嵌套路由
- [x] 标签导航栏（redux）
- [x] 按钮权限
- [x] 登录状态
- [x] 图表展示（echarts）
- [x] `Mock`数据

## run
```
npm i

npm run dev
```
或
```
npx vite --port=5000
```

## Images
![login](./img/index.png)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
