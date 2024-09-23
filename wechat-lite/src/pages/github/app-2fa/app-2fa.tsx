import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './app-2fa.less'
import { SubPageWarpper } from '@/components/warppers'
import { githubIcon } from '@/assets'
import { ListItem } from '@/components/list'
import { Ufo } from '@/components/ufo'
import { useInterval, useStorage } from '@/hooks'
import { useMemo, useState, useEffect } from 'react'
import { getExpireTime, getTotp } from '@/libs'

export default function App2fa() {
  const [totpTimer, setTotpTimer] = useState(0)
  const [cycle, setCycle] = useState(1)

  useLoad(() => {
    console.log('Page loaded.')
  })

  const clear = useInterval(() => {
    // 计算totp剩余有效时间
    const expire = getExpireTime();
    
    setTotpTimer(expire);
    if (expire >= 29) setCycle(cycle + 1);
  }, 99)

  useEffect(() => {
    console.log('start totpTimer', totpTimer);

    return () => {
      clear();
    }
  }, []);

  const { storage, setStorage } = useStorage('__2fa_apps');

  const apps = useMemo(() => {
    if (!storage) return [];
    return JSON.parse(storage);
  }, [storage]);

  const handleScanAppQr = async () => {
    console.log('add app');
    // @ts-ignore
    const [err, res] = await Taro.scanCode({ scanType: ['qrCode'] })[Symbol.result]();
    if (err) {
      Taro.showToast({ title: '扫码失败', icon: 'none' });
      return;
    }

    if (!res.result.startsWith('otpauth')) {
      Taro.showToast({ title: '非2af二维码', icon: 'none' });
      // TODO  提供手动添加密钥的方法
      return;
    }

    const account = otpauthFormatter(res.result);
    console.log('扫码结果: ', account);
    // 去重一下
    let tmp = [...apps];
    const existIdx = tmp.findIndex(app => app.key === account.key);
    if (existIdx > -1) tmp.splice(existIdx, 1);

    setStorage(JSON.stringify([account, ...tmp]));
  }

  const [showAddApp, setShowAddApp] = useState(false);
  const handleAddApp = () => {
    Taro.navigateTo({ url: '/pages/github/add-2fa/add-2fa' })
  }

  const showApp2faOtp = (app: IOtpauth) => {
    const totp = getTotp(app.secret);
    console.log('show app otp', totp, app);
  }

  return (
    <SubPageWarpper>
      <ListItem>
        <View className='app-item'>
          <Image src={githubIcon} className='app-icon'></Image>

          <View className='app-info'>
            <Text className='app-name'>Github</Text>
            <Text className='app-label'>xxxxx@xx.xx</Text>
          </View>
        </View>
      </ListItem>
      <ListItem>
        <View className='app-item'>
          <Image src={githubIcon} className='app-icon'></Image>

          <View className='app-info'>
            <Text className='app-name'>Github</Text>
            <Text className='app-label'>xxxxx@xx.xx</Text>
          </View>
        </View>
      </ListItem>

      {
        apps.map((app, index) => {
          return <ListItem key={'app' + index}
            expands={<>
              <ListItem key={'app-expands' + index}
                label='Code:'
                onClick={() => {
                  Taro.setClipboardData({
                    data: getTotp(app.secret),
                    success: () => {
                      Taro.showToast({
                        title: 'Code Copyed',
                        icon: 'success'
                      })
                    }
                  })
                }}
              >
                <Text className='app-code'>{cycle && getTotp(app.secret)}</Text>
                <Text> Exprid at {totpTimer}</Text>
              </ListItem>
            </>}
          >
            <View className='app-item' onClick={showApp2faOtp.bind(null, app)}>
              {/* TODO 区分下哥哥平台 */}
              <Image src={githubIcon} className='app-icon'></Image>

              <View className='app-info'>
                <Text className='app-name'>{app.platform}</Text>
                <Text className='app-label'>{app.label}</Text>
              </View>
            </View>
          </ListItem>
        })
      }

      <ListItem>asdadasdas</ListItem>

      <Ufo style={{ bottom: 120 }} onClick={handleAddApp}>F</Ufo>
      <Ufo style={{ bottom: 60 }} onClick={handleScanAppQr}>+</Ufo>
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

const otpauthFormatter: (otpauth: string) => IOtpauth = (otpauth) => {
  // 解析注释中的字符串
  // debugger
  // const comment = '//otpauth://totp/GitHub:eric-lua?secret=EKBWYQQ4DBICDGJL&issuer=GitHub';
  const otpauthString = otpauth.split('://')[1];

  // 解析 otpauth 字符串
  const queryStartIndex = otpauthString.indexOf('?');
  const queryPart = queryStartIndex !== -1 ? otpauthString.substring(queryStartIndex + 1) : '';

  // 手动解析查询参数
  const params = {};
  const queryPairs = queryPart.split('&');
  for (const pair of queryPairs) {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  }

  // 构造 account 对象
  let platform = otpauthString.split(':')[0];
  platform = platform.includes('/') ? platform.split('/')[1] : platform;
  const label = otpauthString.split(':')[1].split('?')[0];
  const issuer = params['issuer'] || '';
  const account: IOtpauth = {
    platform,
    label,
    secret: params['secret'] || '',
    issuer,
    otpauth: otpauthString,
    key: `${platform}_${label}_${issuer}`,
  };

  // 输出格式化的 account 对象
  console.log(JSON.stringify(account, null, 2));
  return account;
}