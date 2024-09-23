export interface IAppItem {
  type: 'feature' | 'custom',
  title: string;
  content: string;
  link?: string;
  descript?: string;
  icon?: string;
  remark?: string;
}

export const All_Features: IAppItem[] = [
  {
    type: 'feature',
    title: '首页',
    icon: 'icon-home',
    content: '应用首页',
    link: '/pages/index/index',
  },
  {
    type: 'feature',
    title: 'MFA',
    icon: 'icon-mfa',
    content: 'Multi-Factor Authentication',
    link: '/pages/github/app-2fa/app-2fa',
  },
]