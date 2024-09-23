## nodejs 版本管理工具
- volta
- nvm
- 其他
- P.S. 全凭喜好

## volta 下载安装
1. 下载 volta 安装包
- windows 直接去github下载 https://github.com/volta-cli/volta/releases
- unix 系统执行命令安装就可以 `curl https://get.volta.sh | bash`
2. volta 配置
- windows 系统需要配置环境变量，可以到volta安装目录执行`./volta setup`自动配置
3. volta 使用
- `volta -v`
- `volta ls node`
- `volta install node@21`
- `volta install pnpm`
4. 绿色上网导致的nodejs安装失败？ --> 配置hooks代理
```json
// windows系统: %Users%\AppData\Local\Volta\hooks.json
// unix系统: ~/.volta/hooks.json
{
  "node": {
    "index": {
      "template": "https://mirrors.cloud.tencent.com/nodejs-release/index.json"
    },
    "distro": {
      "template": "https://mirrors.cloud.tencent.com/nodejs-release/v{{version}}/node-v{{version}}-{{os}}-x64.zip"
    }
  }
}
```