/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';

export type IconNames = 'a-Frame1' | 'a-bao3' | 'wenhao01' | 'lianxi2hebing-15' | 'stop' | 'xuanzhong' | 'shangdianjia' | 'tuijian' | 'jiagebiaoqian' | 'yishiyong' | 'jiduka' | 'bannianka' | 'nianka' | 'changjianwenti' | 'fahuoyizhan' | 'buzhoujiange' | 'dingzhitaocan' | 'querentaocan' | 'dingzhitaocan0' | 'buzhoujiange0' | 'xuanzechongwu' | 'querentaocan0' | 'xuanzechongwu0' | 'yiguoqi' | 'yilingqu' | 'a-ShopVoucher' | 'a-ProductVoucher' | 'a-bianzu2' | 'a-bianzu2beifen' | 'Discount' | 'Campaigns' | 'a-LiveStreaming' | 'Vouchers' | 'weilingqu' | 'kapian' | 'xianjin' | 'Frame5' | 'Frame-31' | 'Frame-21' | 'Frame-12' | 'Frame3' | 'Frame-11' | 'Frame-3' | 'Frame-5' | 'Frame-2' | 'category-details' | 'Lamp' | 'morendizhi' | 'jiahao' | 'group52' | 'a-edit' | 'a-bianzu67beifen3' | 'riqizujiantubiao' | 'a-User' | 'a-bianzu8' | 'a-More' | 'a-prompt' | 'rc-edit' | 'a-bianzu3' | 'a-bianzu21' | 'bianzu1' | 'a-bianzu4' | 'a-bianzu5' | 'a-bianzu7' | 'a-bianzu6' | 'a-bianzu70' | 'a-sort' | 'xiajia' | 'Edit' | 'Frame4' | 'preview' | 'a-WechatSetting' | 'a-bianzu14' | 'a-bianzu12-1' | 'a-bianzu13' | 'a-bianzu18beifen-1' | 'a-bianzu15' | 'a-bianzu18' | 'a-bianzu10' | 'a-bianzu11' | 'a-bianzu11-1' | 'a-bianzu12' | 'dingdan' | 'bianzu3' | 'a-Frame2' | 'bianzu2' | 'delete' | 'Frame-1' | 'a-xingzhuangjiehe2' | 'a-xingzhuangjiehe3' | 'bianzu-1' | 'Frame2' | 'a-Group437' | 'bianzu' | 'xingzhuangjiehe' | 'kjafg' | 'Frame1' | 'Vector' | 'Frame' | 'dabaodaifahuo' | 'rili' | 'Order';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  // @ts-ignore
  return <iconfont name={name} size={parseFloat(Taro.pxTransform(size))} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
