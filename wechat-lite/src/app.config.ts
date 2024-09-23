export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  subPackages: [
    {
      root: 'pages/github',
      pages: [
        'app-2fa/app-2fa'
      ]
    }
  ]
})
