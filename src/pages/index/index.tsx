import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import './index.less'
import React, { useState } from 'react'
const SkuCard = (props) => {
  const { value, label, onChange, disabled, activate, style } = props
  const [innerActive, setInnerActive] = useState(activate ?? false)

  const handleChange = (value) => () => {
    if (!disabled) {
      onChange?.(value, !innerActive)
      setInnerActive(!innerActive)
    }
  }

  return (
    <div
      className={disabled ?? false ? 'disabled' : activate ?? innerActive ? 'activate' : 'normal'}
      onClick={handleChange(value)}
      style={{ ...(style ?? {}) }}
    >
      {label}
    </div>
  )
}

// 定义了Empty,这个Empty对空的时候进行设置
const Empty = Symbol('empty')

const SkuGroup = (props) => {
  const { value, onChange, skuName } = props

  const [selected, setSelected] = useState(value)
  const { children } = props

  const _onChange = (value, activate) => {
    const _value = !activate && selected === value ? Empty : value
    setSelected(_value)
    onChange?.(_value)
  }

  const renderGroupChild = (child, index) => {
    const { props: childProps } = child

    return React.cloneElement(child, {
      ...childProps,
      onChange: _onChange,
      activate: childProps.value === selected,
      key: `create-${index}`,
      style: {
        ...(childProps?.style ?? {}),
        marginLeft: index === 0 ? 0 : '20px',
      },
    })
  }

  return (
    <div className="skuGroup">
      {skuName && <div className="labelName">{skuName}</div>}
      {children.map((child, index) => {
        return child?.type === SkuCard ? renderGroupChild(child, index) : child
      })}
    </div>
  )
}

// scrollTop: 0,
const list = [
  {
    id: 'A',
    name: 'A',
  },
  {
    id: 'B',
    name: 'B',
  },
  {
    id: 'C',
    name: 'C',
  },
  {
    id: 'D',
    name: 'D',
  },
]
export default () => {
  // 代码中的几个关键变量
  // skuList: 商品拥有的所有sku组合的型号(SPU中的所有商品类型)
  // sku: 需要显示的sku card
  // selectSku: radio显示选中值的[1, 2, 3]

  // 初始化的时候aviableSku就是所有的商品类目
  const _getSku = (aviableSku = []) => {
    const _sku = {}
    const _aviableSku: any = {}

    // 得到目前可以选择的所有商品的sku
    aviableSku.forEach((item) => {
      item.forEach((x) => {
        const key = JSON.stringify({ key_id: x.key_id, key: x.key })

        const value = {
          value_id: x.value_id,
          value: x.value,
          disabled: false,
        }

        _aviableSku[key]
          ? _aviableSku[key].some((z) => z.value_id === x.value_id)
            ? null
            : _aviableSku[key].push(value)
          : (_aviableSku[key] = [value])
      })
    })

    // 将SKU中所有不满足aviableSku的东西diabled掉
    skuList.forEach((item) => {
      // 每个商品
      item.forEach((x, i) => {
        // 商品下的每个sku
        const key = JSON.stringify({ key_id: x.key_id, key: x.key })
        const value = {
          value_id: x.value_id,
          value: x.value,
          disabled: !_aviableSku[key].some((item) => item.value_id === x.value_id),
        }

        _sku[key]
          ? _sku[key].some((z) => z.value_id === x.value_id)
            ? null
            : _sku[key].push(value)
          : (_sku[key] = [value])
      })
    })

    setMySku(_sku)
  }

  // const [viewId, setViewId] = useState("A");
  // const setViews = (item) => {
  //   console.log(item);
  //   let id = item.id;
  //   setViewId(id);
  // };
  return (
    <View>
      <View style="height:90vh">cscs</View>
      <View className="toolBar sticky top-10">
        {list.map((item) => {
          return (
            <View
              className="tag inline-block"
              key={item.id}
              onClick={() => {
                setViews(item)
              }}
            >
              {[item.name]}
            </View>
          )
        })}
      </View>
      <ScrollView style="height:100vh" className="scrollview" scrollY scrollIntoView={viewId}>
        <View id="A" style="height:500px;background:red">
          A
        </View>
        <View id="B" style="height:500px;background:green">
          B
        </View>
        <View id="C" style="height:500px;background:red">
          C
        </View>
        <View id="D" style="height:500px;background:green">
          D
        </View>
        <View id="E" style="height:500px;background:red">
          E
        </View>
        <View id="F" style="height:500px;background:green">
          F
        </View>
        <View id="G" style="height:500px;background:red">
          G
        </View>
        <View id="H" style="height:500px;background:green">
          H
        </View>
        <View id="I" style="height:500px;background:red">
          I
        </View>
        <View id="J" style="height:500px;background:green">
          J
        </View>
      </ScrollView>
    </View>
  )
}
