import { View } from "@tarojs/components";
import React, { ForwardedRef, useState, useImperativeHandle } from "react";
import './Ufo.less';

export interface UfoProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

export interface UfoInstance {
  close: () => void;
  show: () => void;
}

export const Ufo = React.forwardRef(({
  children,
  className = '',
  style = {},
  onClick,
}: UfoProps, ref: ForwardedRef<UfoInstance>) => {
  const [isHide, setIsHide] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      close: () => {
        setIsHide(true);
      },
      show: () => {
        setIsHide(false);
      }
    }
  })

  const formatChildren = () => {
    if (typeof children === 'string') {
      return children.substring(0, 1);
    } else {
      return children;
    }
  }

  return isHide
    ? <></>
    : <View 
    className={`${className} __ufo ${typeof children === 'string' ? 'is-char' : ''}`} 
    style={style}
    onClick={() => onClick?.()}
    >
      {formatChildren()}
    </View>
})