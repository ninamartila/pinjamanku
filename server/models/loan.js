'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.Lender, {foreignKey: "lenderID"})
      Loan.belongsTo(models.Borrower, {foreignKey: "borrowerID"})
    }
  };
  Loan.init({
    externalID: DataTypes.STRING,
    lenderID: DataTypes.INTEGER,
    borrowerID: DataTypes.INTEGER,
    status: DataTypes.STRING,
    initialLoan: DataTypes.INTEGER,
    tenor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};