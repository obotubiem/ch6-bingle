const mockUserRepo = (
    {
        returnGetAllUser,
        returnGetUserByID,
        returnUpdateUser

}
) =>{
    const repo = {}
    repo.getAllUser = jest.fn().mockReturnValue(
        returnGetAllUser !== true ? returnGetAllUser : [
            {
            "id": 2,
            "firstName": "jhon",
            "lastName": "doe",
            "username": "jhon",
            "phone": "082111255",
            "email": "jhon@email.com",
            "avatar": null,
            "role_id": 2,
            }
        ]
    )
    repo.getUserByID = jest.fn().mockReturnValue(
        returnGetUserByID !== true ? returnGetUserByID : {
        "id": 2,
        "firstName": "jhon",
        "lastName": "doe",
        "username": "jhon",
        "phone": "082111255",
        "email": "jhon@email.com",
        "avatar": null,
        "role_id": 2,
        }
    )
    repo.returnUpdateUser = jest.fn().mockReturnValue(
        returnUpdateUser !== true ? returnUpdateUser : true
    )
    return repo
}

module.exports = mockUserRepo