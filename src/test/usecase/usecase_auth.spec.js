mockAuthRepo = (
    {
      returnLogin  
    }
) => {
    const repo ={}
    repo.loginUser = jest.fn().mockReturnValue(
        returnLogin !== true ? returnLogin : {
            
        }
    )
}