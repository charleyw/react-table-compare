const faker = require('faker/locale/zh_CN')
const fs = require('fs')
const path = require('path')
const os = require("os");

const rowNumber = 2000

const csvGenerator = fs.createWriteStream(`fake-data-${rowNumber}.csv`, {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

csvGenerator.write(["id", "city", "email", "firstName", "lastName", "street", "zipCode", "date", "bs", "catchPhrase", "companyName", "words", "sentence"].join(',') + os.EOL)

for (let i = 0; i< rowNumber; i++) {
  csvGenerator.write([
    i,
    faker.address.city(),
    faker.internet.email(),
    faker.name.firstName(),
    faker.name.lastName(),
    faker.address.streetName(),
    faker.address.zipCode(),
    faker.date.past(),
    faker.company.bs(),
    faker.company.catchPhrase(),
    faker.company.companyName(),
    faker.lorem.words(),
    faker.lorem.sentence(),
  ].join(',') + os.EOL)
}