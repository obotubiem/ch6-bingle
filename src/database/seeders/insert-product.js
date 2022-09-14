module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Products", [
            {
                name: "Kaos Partai",
                price: 45000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                image : null,
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "kemeja",
                price: 95000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                image : null,
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Celaja Jeans",
                price: 145000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                image : null,
                category_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Celana pendek",
                price: 100000,
                stock: 100,
                sold: 0,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu varius diam, quis iaculis lorem. Quisque in purus vel quam auctor congue. Curabitur vel pulvinar ipsum, id consequat nulla.",
                image : null,
                category_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
           
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Products", null, {})
    }
}