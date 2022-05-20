

import { View } from '@tarojs/components';
import './index.less'

type RadioType = {
  options: any[],
  value: string | number,
  onClick: (val: any) => void;
}

const AtMyRadio = ({ options, value, onClick }: RadioType) => {


  return <View className='flex flex-row items-center '>
    {
      options.map((item: any) => (
        <View className={`at-radio__option ${value === item.value && 'checked_after'}`} key={item.value} onClick={() => onClick(item.value)}>
          {item.label}
        </View>
      ))
    }

  </View>


}


export default AtMyRadio