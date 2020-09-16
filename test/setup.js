process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret'

require('dotenv').config()

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || "postgresql://dunder_mifflin@localhost/capstone1-test"

console.log(process.env.NODE_ENV)

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest
