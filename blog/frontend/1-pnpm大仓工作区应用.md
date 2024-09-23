## pnpm monorepo 工作区应用
> https://pnpm.io/zh/workspaces

1. 安装 pnpm
- npm install -g pnpm
- volta install pnpm
2. 创建工作区
- mkdir my-project
- cd $_ && pnpm init && touch pnpm-workspace.yaml
3. 配置 pnpm-workspace.yaml
```yaml
packages:
  - packages/*
  - apps/*
  - ...
```

## 子项目开发
1. 启动命令 `pnpm --filter <project-name> <script-name>`

## 工作区依赖管理

## 工作区内部lib调用

## lib发布
