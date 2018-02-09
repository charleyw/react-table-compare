import React, {Component} from 'react';
import PropTypes from "prop-types";
import faker from "faker/locale/zh_CN";

import ReactDataGrid from 'react-data-grid'
import {Selectors} from 'react-data-grid-addons/src/data'
import 'antd/dist/antd.css';
import createFakeData from './createFakeData';

const [rows, columnNames] = createFakeData(10000, 50)

// const [rows, columnNames] = createFakeData(10000, 10)

export default class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = columnNames.map(name => ({
      name: name,
      key: name,
      filterable: true,
      sortable: true
    }))
    this.state = { rows: rows, filters: {}, sortColumn: null, sortDirection: null };
  }


  componentDidMount() {
    console.timeEnd('firstRender')
  }

  componentDidUpdate() {
    console.timeEnd('排序')
    console.timeEnd('过滤')
  }

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows[rowIdx];
  };

  handleGridSort = (sortColumn, sortDirection) => {
    console.time('排序')
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  };

  handleFilterChange = (filter) => {
    console.time('过滤')
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }

    console.log(newFilters)

    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  render() {
    return  (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.getSize()}
        toolbar={({onToggleFilter}) => <div onClick={onToggleFilter}>filter</div>}
        minHeight={500}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        overScan={{colsStart: 5, colsEnd: 5,rowsStart: 10, rowsEnd: 20}}
      />)
  }
}