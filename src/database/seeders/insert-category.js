module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Categories", [
            {
                name: "Baju",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "celena",
                createdAt: new Date(),
                updatedAt: new Date()
            }
           
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Categories", null, {})
    }
}