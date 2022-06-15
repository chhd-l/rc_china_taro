import Taro from '@tarojs/taro'
import ApiRoot from '../fetcher'

//获取PDP page vouchers
export const getLiveStreamingFindOnLive = async (accountId) => {
    // const { liveStreamingFindOnLive } = {
    //     "liveStreamingFindOnLive": [
    //         {
    //             "id": null,
    //             "accountId": null,
    //             "accountPrincipal": null,
    //             "accountName": null,
    //             "name": "吞吞吐吐拖",
    //             "roomId": 9,
    //             "coverImg": "http://mmbiz.qpic.cn/mmbiz_png/KRKXQ3Tw1J30agfcAobj13NXXlALACFUtw6951ibVbFglnksg0uRqLMeoTdBamqtD3V9GysxTmPtKzDT3licW7sg/0",
    //             "shareImg": "http://mmbiz.qpic.cn/mmbiz_png/KRKXQ3Tw1J30agfcAobj13NXXlALACFUtw6951ibVbFglnksg0uRqLMeoTdBamqtD3V9GysxTmPtKzDT3licW7sg/0",
    //             "liveImg": null,
    //             "liveStatus": 101,
    //             "startTime": "2022-05-31T09:56:31Z",
    //             "endTime": "2022-06-02T16:00:00Z",
    //             "anchorName": "tttt",
    //             "liveType": 0,
    //             "createdAt": null
    //         }
    //     ]
    // }
    Taro.setStorageSync('commerce-loading', 1)
    try {
        const { liveStreamingFindOnLive } = await ApiRoot.liveStreams().liveStreamingFindOnLive(accountId)
        return liveStreamingFindOnLive
    } catch (err) {
        console.log('err', err)
        return null
    }
}
