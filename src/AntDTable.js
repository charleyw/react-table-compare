import React, {Component} from 'react';
import {Table} from 'antd';
import 'antd/dist/antd.css';
import createFakeData from './createFakeData';

const [rows, columnNames] = createFakeData(10000, 10)

export default class AntDTable extends Component {
  constructor(props) {
    super(props)
    const columns = columnNames.map(name => ({
      title: name,
      dataIndex: name,
      key: name,
      width: "160px"
    }))
    columns[0].fixed = 'left'
    this.state = {dataSource: rows, columns}
  }
  render() {
    const {dataSource, columns} = this.state
    return (
      <Table
        rowKey="index"
        dataSource={dataSource}
        columns={columns}
        scroll={{x: 1500, y: 500}}
        pagination={{
          showSizeChanger: true,
          pageSize: 500,
          pageSizeOptions: [100, 200, 500, 1000]
        }}
      />
    )
  }
}
