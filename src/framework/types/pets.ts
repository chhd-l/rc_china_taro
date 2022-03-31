import { Scalars, Image } from '../schema/common.schema'

export type Pet = {
    id?: number
    petsType: string
    name: string
    type: string
    gender: string
    sterilization: string
    birthday: Scalars['DateTime']
    img: Image
    age: string//只有1月/1个月 没有1岁1个月
}