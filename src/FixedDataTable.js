import React, {Component} from 'react';
import PropTypes from "prop-types";
import faker from "faker/locale/zh_CN";

import {Table, Column, Cell} from 'fixed-data-table-2'

import {Selectors} from 'react-data-grid-addons/src/data'
import 'fixed-data-table-2/dist/fixed-data-table.css';
import createFakeData from './createFakeData';
const FixedRightColumnsExample = require('fixed-data-table-2/examples/FixedRightColumnsExample')

const [rows, columnNames] = createFakeData(100000, 100)

// const [rows, columnNames] = createFakeData(10000, 10)

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    var {onSortChange, sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

export default class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = columnNames.map(name => ({
      name: name,
      key: name,
      filterable: true,
      sortable: true
    }))
    this.state = { rows: rows, filters: {}, sortColumn: null, sortDirection: null,  colSortDirs: {}, columnWidths: {} };

    this._onSortChange = this._onSortChange.bind(this);
    console.time('firstRender')
  }

  componentDidMount() {
    console.timeEnd('firstRender')
  }

  componentDidUpdate() {
    console.timeEnd('排序')
    console.timeEnd('过滤name_1')
  }

  _onSortChange(columnKey, sortDir) {
    console.time('排序')
    const sortIndexes = this.state.rows.slice();
    sortIndexes.sort((indexA, indexB) => {
      const valueA = indexA[columnKey];
      const valueB = indexB[columnKey];
      let sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      rows: sortIndexes,
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }

  getRows = () => {
    return this.state.rows;
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows[rowIdx];
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  };

  handleFilterChange = (filter) => {
    console.time('过滤name_1')
    const newRows = rows.filter(row => {
      let rowValue = row['name_1'];
      if (rowValue !== undefined) {
        if (rowValue.toString().toLowerCase().indexOf(filter) === -1) {
          return false
        }
      } else {
        return false
      }

      return true
    })

    // console.log(newRows)

    this.setState({ rows: newRows });
  };

  onClearFilters = () => {
    this.setState({ rows: rows });
  };

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  getColWidth = (colkey) => {
    const {columnWidths} = this.state
    return columnWidths[colkey] || 160
  }

  render() {
    const {colSortDirs} = this.state
    return (
      <div>
        <input type="text" onChange={e => this.handleFilterChange(e.target.value)}/>
        <FixedRightColumnsExample/>
      </div>
    );
  }
}