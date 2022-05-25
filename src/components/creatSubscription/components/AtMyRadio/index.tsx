

import { View } from '@tarojs/components';
import './index.less'

type AtRadioProps = {
  value: string | number,
  onClick: (val: any) => void;
}

const options = [{
  value: 'FRESH_NORMAL',
  label: '普通',

}, {
  value: 'FRESH_100_DAYS',
  label: '100天'
},]

const AtMyRadio = ({ value, onClick }: AtRadioProps) => {

  return <View className='flex flex-row items-center '>
    {
      options.map((item: any) => (
        <View className={`at-radio__option ${value === item.value && 'checked_after'} `} key={item.value} onClick={() => onClick(item.value)}>
          {item.label}
        </View>
      ))
    }

  </View>


}


export default AtMyRadio