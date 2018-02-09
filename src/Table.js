import React, {Component} from 'react';
import faker from 'faker';
import {AutoSizer, Table, Column, ScrollSync} from 'react-virtualized';
import 'react-virtualized/styles.css';
import './Table.css';

const rowNumber = 10000
const columnNumber = 100

let rows = []
let columns = []

for (let j = 0; j < columnNumber; j++) {
  columns.push(`name_${j}`)
}

for (let i = 0; i < rowNumber; i++) {
  const row = {}
  for (let name of columns) {
    row[name] = faker.name.findName()
  }
  rows.push(row)
}

console.log(rows[0])
console.log(columns[0])

const containerStyle = {
  position: 'relative',
  paddingLeft: 40
}

const leftHeaderStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  background: '#000',
  color: '#fff'
}

class XXTable extends Component {
  render() {
    return (
      <ScrollSync>
        {({onScroll, scrollTop}) => {
          return (
            <div style={containerStyle}>
              <div className="rowHeader">
                <Table
                  height={200}
                  headerHeight={40}
                  rowHeight={40}
                  width={40}
                  rowCount={rows.length}
                  rowGetter={(row) => row}
                  scrollTop={scrollTop}
                >
                  <Column
                    label=""
                    dataKey="index"
                    width={40}
                  />
                </Table>
              </div>
              <Table
                ref="Table"
                headerHeight={40}
                height={200}
                rowHeight={40}
                rowCount={rows.length}
                rowGetter={({index}) => rows[index]}
                width={columns.length * 200}
                onScroll={onScroll}
              >
                {columns.map((c, index) => (
                  <Column
                    key={index}
                    label={c}
                    dataKey={c}
                    width={200}
                  />
                ))}
              </Table>
            </div>
          )
        }}
      </ScrollSync>
    );
  }
}

export default XXTable;
