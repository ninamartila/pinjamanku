const ControllerBorrower = require('../controllers/controllerBorrower');
const routerBorrower = require('express').Router();

routerBorrower.get('/', ControllerBorrower.getAll)
routerBorrower.get('/:id', ControllerBorrower.getById)
routerBorrower.post('/', ControllerBorrower.add)
routerBorrower.put('/:id', ControllerBorrower.edit)
routerBorrower.delete('/:id', ControllerBorrower.delete)

module.exports = routerBorrower