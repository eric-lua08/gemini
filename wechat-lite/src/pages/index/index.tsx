import { View, Text, Navigator } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'
import { AppList } from '@/components/app-list'
import { SubPageWarpper } from '@/components/warppers'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <SubPageWarpper  >
      <AppList />
    </SubPageWarpper>
  )
}
