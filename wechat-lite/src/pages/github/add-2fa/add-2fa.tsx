import { View, Text, Image, Label, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
// import './add-2fa.less'
import { SubPageWarpper } from '@/components/warppers'
import { useInterval, useStorage } from '@/hooks'
import { useMemo, useState, useEffect } from 'react'

export default function Add2fa() {
  // interface IOtpauth {
  //   key: string;
  //   platform: string;
  //   label: string;
  //   secret: string;
  //   issuer: string;
  //   otpauth: string;
  // }
  

  useLoad(() => {
    console.log('Page loaded.')
  })
  const [formdata, setFormdata] = useState({
    label: '',
    secret: '',
    issuer: '',
  })

  

  const { storage, setStorage } = useStorage('__2fa_apps');

  const apps = useMemo(() => {
    if (!storage) return [];
    return JSON.parse(storage);
  }, [storage]);

  const [showAddApp, setShowAddApp] = useState(false);
  const handleAddApp = () => {
    console.log('add app', formdata);

    if (!formdata.secret) {
      Taro.showToast({ title: 'Secret 不能为空', icon: 'none' });
      return;
    }

    if (!formdata.issuer) {
      Taro.showToast({ title: 'Issuer 不能为空', icon: 'none' });
      return;
    }

    const {label, secret, issuer} = formdata;

    const account: IOtpauth = {
      key: `${issuer}_${label}_${issuer}`,
      platform: issuer,
      label: label,
      secret,
      issuer,
      otpauth: `otpauth://totp/${issuer}:${label}?secret=${secret}&issuer=${issuer}`
    };
    console.log('扫码结果: ', account);
    // 去重一下
    let tmp = [...apps];
    const existIdx = tmp.findIndex(app => app.key === account.key);
    if (existIdx > -1) tmp.splice(existIdx, 1);

    setStorage(JSON.stringify([account, ...tmp]));

    Taro.navigateBack();
  }

  return (
    <SubPageWarpper>
      <Label>
        <Text className='title'>Issuer: </Text>
        <Input type='text' placeholder='Issuer' value={formdata.issuer} onInput={(e) => {
          setFormdata({ ...formdata, issuer: e.detail.value });
        }}></Input>
      </Label>
      <Label>
        <Text className='title'>Label: </Text>
        <Input type='text' placeholder='Label' value={formdata.label} onInput={(e) => {
          setFormdata({ ...formdata, label: e.detail.value });
        }}></Input>
      </Label>
      <Label>
        <Text className='title'>Secret: </Text>
        <Input type='text' placeholder='Secret' value={formdata.secret} onInput={(e) => {
          setFormdata({ ...formdata, secret: e.detail.value });
        }}></Input>
      </Label>
      <View className='add-app' onClick={handleAddApp}>Add App</View>
    </SubPageWarpper>
  )
}

export interface IOtpauth {
  key: string;
  platform: string;
  label: string;
  secret: string;
  issuer: string;
  otpauth: string;
}
