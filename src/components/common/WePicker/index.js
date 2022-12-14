import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import RegionPicker from "./RegionPicker/index"
import './index.scss'

let defaultTime = new Date().getFullYear()
export default class WPicker extends Component {
    state = {
        itemHeight: `height: 88rpx;`,
        visible: false,
        result: {},
        confirmFlag: true,
        createKey: null
    }
    componentWillMount() {
        this.props.onRef(this)
        this.setState({
            createKey: Math.random() * 1000
        })
    }

    touchStart = () => {
        if (this.props.timeout) {
            this.setState({
                confirmFlag: false
            })
        }
    }
    touchEnd = () => {
        if (this.props.timeout) {
            setTimeout(() => {
                this.setState({
                    confirmFlag: true
                })
            }, 500)
        }
    }
    handlerChange = (res) => {
        this.setState({
            result: { ...res }
        })
    }
    show = () => {
        this.setState({
            visible: true
        })
    }
    hide = () => {
        this.setState({
            visible: false
        })
    }

    onCancel = (res) => {
        this.setState({
            visible: false
        })
        this.props.cancel();
    }

    pickerConfirm = () => {
        if (!this.state.confirmFlag) {
            return;
        };
        this.props.confirm(this.state.result);
        this.setState({
            visible: false
        })
    }

    render() {
        const { itemHeight, visible, confirmFlag, createKey } = this.state
        return (
            <View class="w-picker" key={createKey} data-key={createKey}>
                <View class={'mask' + (visible ? ' visible' : '')} onTap={this.onCancel} catchtouchmove={true}></View>
                <View class={'w-picker-cnt' + (visible ? ' visible' : '')}>
                    <View class="w-picker-header" catchtouchmove={true}>
                        <Text onTap={this.onCancel}>??????</Text>
                        {this.props.children}
                        <Text style={'color:' + this.props.themeColor} onTap={this.pickerConfirm}>??????</Text>
                    </View>

                    <View>{this.props.mode == 'region' ? (<RegionPicker
                        class="w-picker-wrapper"
                        value={this.props.value}
                        hideArea={this.props.hideArea}
                        itemHeight={itemHeight}
                        defaultType={this.props.defaultType}
                        change={this.handlerChange}
                        touchstart={this.touchStart}
                        touchend={this.touchEnd}>
                    </RegionPicker>) : null}</View>

                </View>
            </View >
        )
    }
}
WPicker.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
    ]),//?????????
    current: PropTypes.bool,//?????????????????????????????????????????????????????????????????????
    second: PropTypes.bool,//time-picker???????????????
    mode: PropTypes.string,
    themeColor: PropTypes.string,//????????????????????????
    fields: PropTypes.string,//???????????????:year???month???day???hour???minute???second
    disabledAfter: PropTypes.bool,//?????????????????????????????????
    options: PropTypes.oneOfType([//selector,region?????????
        PropTypes.array,
        PropTypes.object,
    ]),
    defaultProps: PropTypes.object,//selector,linkagle??????????????????
    defaultType: PropTypes.string,
    hideArea: PropTypes.bool,//mode=region???????????????????????????
    level: PropTypes.oneOfType([//???????????????????????????????????????,??????2-4;
        PropTypes.string,
        PropTypes.number,
    ]),
    timeout: PropTypes.bool,//????????????????????????,??????????????? ???????????????????????????????????????????????????????????????
    expand: PropTypes.oneOfType([//mode=shortterm ????????????????????????
        PropTypes.string,
        PropTypes.number,
    ]),
    startYear: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    endYear: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
}
WPicker.defaultProps = {
    value: "",
    current: false,
    second: true,
    mode: "date",
    themeColor: "#f5a200",
    fields: "date",
    disabledAfter: false,
    options: [],
    defaultProps: {
        label: "label",
        value: "value",
        children: "children"
    },
    defaultType: "label",
    hideArea: false,
    level: 2,
    timeout: false,
    expand: 30,
    startYear: 1970,
    endYear: defaultTime
};

