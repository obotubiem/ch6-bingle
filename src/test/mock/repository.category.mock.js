const mockCategoryRepo = (
    {
        returnGetAllCategory,
        returnGetCategoryByID,
        returnCreateCategory
    }
) => {

    const repo = {}

    repo.getCategoryByID = jest.fn().mockReturnValue(
        returnGetCategoryByID !== true ? returnGetCategoryByID : {
            
            id: "1",
            name: "celana",
        }
    )
    repo.getCategory = jest.fn().mockReturnValue(
        returnGetAllCategory !== true ? returnGetAllCategory : [
            {
                id: "1",
                name: "celana", 
            }
        ]
    )
    repo.createCategory = jest.fn().mockReturnValue(
        returnCreateCategory !== true ? returnCreateCategory : {
             
                id: "1",
                name: "celana",
        }
    )
    return repo
}

module.exports = mockCategoryRepo