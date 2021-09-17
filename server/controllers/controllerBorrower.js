//const {Borrower} = require('models');

class ControllerBorrower {
    static async getAll(req, res, next) {
        try {
            const result = await Borrower.findAll()

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        const id = Number(req.params.id)

        try {
            const result = await Borrower.findByPk(id)

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    static async add(req, res, next) {
        const { firstName, lastName, phoneNumber, address, IdOccupation } = req.body
        const newBorrower = {
            firstName, lastName, phoneNumber: Number(phoneNumber), address, IdOccupation: Number(IdOccupation)
        }

        try {
            const result = await Borrower.create(newBorrower)

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    static async edit(req, res, next) {
        const { firstName, lastName, phoneNumber, address, IdOccupation } = req.body
        const id = Number(req.params.id)
        const newBorrower = {
            firstName, lastName, phoneNumber: Number(phoneNumber), address, IdOccupation: Number(IdOccupation)
        }

        try {
            const findBorrower = await Borrower.findByPk(id)

            if (findBorrower) {
                const result = await Borrower.update(newBorrower, { where: { id }, returning: true })

                res.status(200).json(result[1][0]);
            } else {
                throw ({ name: 'NotFound', type: 'Borrower' })
            }
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        const id = Number(req.params.id)

        try {
            const findBorrower = await Borrower.findByPk(id)

            if (findBorrower) {
                const result = await Borrower.distroy({ where: { id } })

                res.status(200).json({ message: 'Borrower has been deleted' });
            } else {
                throw ({ name: 'NotFound', type: 'Borrower' })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerBorrower