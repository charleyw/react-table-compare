/**
 * Copyright Schrodinger, LLC
 */

"use strict";
import 'fixed-data-table-2/dist/fixed-data-table.css';
const React = require('react');
const { Table, Column, Cell } = require('fixed-data-table-2');
const FakeObjectDataListStore = require('./FakeObjectDataListStore');
const { DateCell, ImageCell, LinkCell, TextCell } = require('./cells');

export default class FixedRightColumnsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    var {dataList} = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={window.innerWidth}
        height={window.innerHeight}
        {...this.props}>
        <Column
          columnKey="avatar"
          cell={<ImageCell data={dataList} />}
          fixed={true}
          width={50}
        />
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<LinkCell data={dataList} />}
          fixedRight={true}
          width={100}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} />}
          fixedRight={true}
          width={100}
        />
        <Column
          columnKey="city"
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList} />}
          width={100}
        />
        <Column
          columnKey="street"
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
        <Column
          columnKey="zipCode"
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
        <Column
          columnKey="email"
          header={<Cell>Email</Cell>}
          cell={<LinkCell data={dataList} />}
          width={200}
        />
        <Column
          columnKey="date"
          header={<Cell>DOB</Cell>}
          cell={<DateCell data={dataList} />}
          width={200}
        />
      </Table>
    );
  }
}
