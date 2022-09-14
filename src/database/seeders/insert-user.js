const bcrypt = require("bcrypt")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                firstName: "admin",
                lastName: "admin",
                username: "admin",
                password: bcrypt.hashSync('123456', 10),
                phone: null,
                email: "admin@email.com",
                avatar: null,
                role_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: "jhon",
                lastName: "doe",
                username: "jhon",
                password: bcrypt.hashSync('123456', 10),
                phone: "082111255",
                email: "jhon@email.com",
                avatar: null,
                role_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {})
    }
}