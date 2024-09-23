import { View } from "@tarojs/components";
import React, { ForwardedRef } from "react";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
}

export interface ListInstance {
  
}

export const List = React.forwardRef((props: ListProps, ref: ForwardedRef<ListInstance>) => {
  return <View className={`${props.className} __list`} style={props.style}>
    {props.children}
  </View>
})