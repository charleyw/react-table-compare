import faker from "faker";

export default (rowCount, colCount) => {
  let rows = []
  let columns = []

  for (let j = 0; j < colCount; j++) {
    columns.push(`name_${j}`)
  }

  for (let i = 0; i < rowCount; i++) {
    const row = {index: i}
    for (let name of columns) {
      row[name] = faker.name.findName()
    }
    rows.push(row)
  }

  return [rows, columns]
}