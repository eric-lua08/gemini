import { View, Text, Navigator } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='app-list'>
      <View className='app-list-item'>
        <Navigator url='/pages/github/app-2fa/app-2fa'>app-2fa</Navigator>
      </View>
      <View className='app-list-item'>
        <Navigator url='/pages/github/app-2fa/app-2fa'>app-2fa</Navigator>
      </View>
      <View className='app-list-item'>
        <Navigator url='/pages/github/app-2fa/app-2fa'>app-2fa</Navigator>
      </View>
      <View className='app-list-item'>
        <Navigator url='/pages/github/app-2fa/app-2fa'>app-2fa</Navigator>
      </View>
      <View className='app-list-item'>
        <Navigator url='/pages/github/app-2fa/app-2fa'>app-2fa</Navigator>
      </View>
    </View>
  )
}
