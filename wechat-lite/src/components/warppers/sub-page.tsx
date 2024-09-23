import { ScrollView, View } from "@tarojs/components"
import React, { ForwardedRef } from "react"
import './sub-page.less';


export interface SubPageWarpperProps extends React.PropsWithChildren {
  title?: string
  style?: React.CSSProperties,
  className?: string,
  ignoreWrapper?: boolean,
}

export interface SubPageWarpperInstance {

}

export const SubPageWarpper = React.forwardRef(({ children, style = {}, className = '', ignoreWrapper = false }: SubPageWarpperProps, ref: ForwardedRef<SubPageWarpperInstance>) => {
  return ignoreWrapper
    ? children
    : <ScrollView  scroll-y style={{ ...style }} className={`${className} __sub-page-wrapper`}>
      {children}
    </ScrollView>
})
