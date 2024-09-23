import { View } from "@tarojs/components"
import './List.less';
import Taro from "@tarojs/taro";
import { useState } from "react";


export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  link?: string;
  expands?: React.ReactNode,
  onClick?: () => void;
}
export const ListItem = ({
  label,
  children,
  style = {},
  className = '',
  link,
  onClick,
  expands,
}: ListItemProps) => {
  const [showExpands, setShowExpands] = useState(false);
  return <>
    <View className={`${className} __list-item`} style={style} onClick={() => {
      if (!link) {
        setShowExpands(!showExpands);
        onClick?.();
      } else {
        Taro.navigateTo({ url: link });
      }
    }}>
      {
        label && <View className='__list-item-label'>{label}</View>
      }
      <View className="__list-item-content">{children}</View>
      <View className="__list-item-arrow">&gt;</View>
    </View>
    {
      !link && showExpands && expands
    }
  </>
}
