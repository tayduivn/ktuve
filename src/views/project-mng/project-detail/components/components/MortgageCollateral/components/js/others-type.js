module.exports = [
  {
    value: '1',
    label: '存货、仓单和提单'
  },
  {
    value: '2',
    label: '机器设备'
  },
  {
    value: '3',
    label: '交通运输设备',
    children: [
      {
        value: '31',
        label: '车辆'
      },
      {
        value: '32',
        label: '飞行器'
      },
      {
        value: '33',
        label: '船舶'
      },
      {
        value: '34',
        label: '其他交通运输设备'
      }
    ]
  },
  {
    value: '4',
    label: '资源资产'
  },
  {
    value: '5',
    label: '知识产权',
    children: [
      {
        value: '51',
        label: '专利权'
      },
      {
        value: '52',
        label: '商标权'
      },
      {
        value: '53',
        label: '著作权'
      },
      {
        value: '54',
        label: '其他知识产权'
      },
    ]
  },
  {
    value: '6',
    label: '其他以上未包括的押品'
  }
]
