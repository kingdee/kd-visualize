/**
 * 转换百万  10000 => 0.01
 * @param v 值
 * @param isMillion 单位是否百万
 */
export const eMillion = (v: any, isMillion = true) => {
  const r = Number(v)
  if (r) {
    if (isMillion) {
      return r > 1000 || r < -1000 ? (r / 1000000).toFixed(2) : 0
    }
    return r.toFixed(2)
  }
  return 0
}

/**
 * 转换百分比  0.23 => 23.0%
 * @param v 值
 * @param fixed 保留几位小数
 * @param isStr 是否返回字符串
 */
export const ePercentage = (v: any, isStr = true, fixed = 2) => {
  const r = (Number(v || 0) * 100).toFixed(fixed)
  if (isStr) {
    return r ? `${r}%` : '0.00%'
  }
  return Number(r) || 0
}

/**
 * hash路由 获取路由参数
 * @param val
 */
export const getQueryVariable = (val: string) => {
  const w = location.hash.indexOf('?')
  const query = location.hash.substring(w + 1)

  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === val) {
      return pair[1]
    }
  }
  return false
}

/**
 * 转换单位
 * @param v 值
 * @param fixed 保留几位小数
 */
const UNIT = [
  { pow: 1, unit: '' },
  { pow: 4, unit: '萬' },
  { pow: 5, unit: '十萬' },
  { pow: 6, unit: '百万' },
  { pow: 7, unit: '千萬' },
  { pow: 8, unit: '億' },
  // { pow: 9, unit: '十億' },
  // { pow: 10, unit: '百億' },
  // { pow: 11, unit: '千億' },
]
export const formatNumber = (num: string | number | undefined, fixed = 2) => {
  if (!num) {
    return {}
  }
  const number = Number(num)
  const numArr = String(num).split('.')
  const integerStr = numArr[0]
  const decimalStr = numArr[1] || ''
  // 此时不转换小数位
  if (integerStr.length + decimalStr.length <= 5) {
    return { unit: UNIT[0].unit, number: num }
  }

  if (integerStr.length <= 1) {
    return {
      unit: UNIT[0].unit,
      number: number.toFixed(fixed),
    }
  }
  for (let index = 1; index < UNIT.length; index++) {
    const { unit, pow } = UNIT[index]
    // eslint-disable-next-line no-restricted-properties
    if (Number(integerStr) / Math.pow(10, pow) < 9) {
      return {
        unit,
        // eslint-disable-next-line no-restricted-properties
        number: (number / Math.pow(10, pow)).toFixed(fixed),
      }
    }
  }
  if (integerStr.length >= UNIT.length) {
    const { unit, pow } = UNIT[5]
    return {
      unit,
      // eslint-disable-next-line no-restricted-properties
      number: (number / Math.pow(10, pow)).toFixed(fixed),
    }
  }
  if (integerStr.length <= 1) {
    return {
      unit: UNIT[0].unit,
      number,
    }
  }
}

/**
 * 设置自动滚动
 * @param id 容器id
 * @param interval 滚动间隔
 * @param height 滚动高度
 */

export const autoScroll = (id: string, interval = 200, height = 2) => {
  const p = document.getElementById(id)
  let initInterval: any = null

  if (p) {
    p.scrollTop = 0
    initInterval = setInterval(() => {
      if (p.scrollTop + p.clientHeight >= p.scrollHeight) {
        p.scrollTop = 0
      } else {
        p.scrollTop = height + p.scrollTop
      }
    }, interval)
  }
  return initInterval
}

/**
 * 转换百万  10000 => 0.01
 * @param v 值   ====0 时 返回 '---'
 * @param isMillion 单位是否百万
 */
export const eMillionShortTerm = (v: any, isMillion = true) => {
  let _value = (parseFloat(v) / 1000000).toFixed(2)
  // return v
  if (_value === '0.00') {
    return '0'
  }
  return _value
}

/**
 * 转换万  10000 => 0.01
 * @param v 值   ====0 时 返回 '---'
 */
export const tenThousandShortTerm = (v: any, isMillion = true) => {
  let _value = (parseFloat(v) / 10000).toFixed(2)
  if (!isMillion) {
    _value = v
  }
  // return v
  if (_value === '0.00' || _value === '0' || _value === 0) {
    return '0'
  }
  return _value
}
