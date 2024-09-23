import { View, Navigator } from "@tarojs/components";
import './AppList.less';
import { All_Features, IAppItem } from "@/constants";

export const AppList = () => {
  return (
    <View className="app-list">
      <View className="section-title">Features</View>
      <AppListContent list={All_Features.filter(item => item.type === 'feature')} />

      <View className="section-title mt-40">My Applications</View>
      <AppListContent list={All_Features.filter(item => item.type === 'custom')} />
    </View>
  );
};

interface AppListContentProps {
  list: IAppItem[];
}
const AppListContent = ({ list }: AppListContentProps) => {
  return (
    <View className='app-list'>
      {
        list.map((item, index) => {
          return (
            <View className='app-list-item' key={'app-item' + index}>
              <Navigator url={item.link}>{item.title}</Navigator>
            </View>
          )
        })
      }
      
      <View className='app-list-item'>
        <Navigator url='/pages/github/app-2fa/app-2fa'>app-2fa</Navigator>
      </View>
    </View>
  )
};
