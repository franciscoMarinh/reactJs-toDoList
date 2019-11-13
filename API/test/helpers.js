const app = require('../app')
const chai = require('chai')
const supertest = require('supertest')

global.request = supertest(app)
global.expect = chai.expect
global.app = app
