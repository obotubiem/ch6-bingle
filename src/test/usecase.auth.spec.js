require('dotenv').config()
const UserUseCase = require('../usecase/user')
const bcyrpt = require('bcrypt')

const mockUserRepo = () => {
    const repo = {}
    repo.loginUser = jest.fn().mockReturnValue({
        username : "testusername",
        password : bcyrpt.hashSync('123456', 10)
    })
    repo.registerUser = jest.fn().mockReturnValue({
        firstName: "firstname",
        lastName: "lastname",
        username : "testusername",
        password : bcyrpt.hashSync('123456', 10),
        phone: "082315512",
        email: "email@email.com",
        avatar: null,
        role_id: 2,
    })
    return repo 
}

const repo = mockUserRepo()
userUC = new UserUseCase(repo)

describe('Auth test suite', function (){
    test('login success', async ()=>{
        let res = await userUC.login('testusername', '123456')
        expect(res.is_success).toEqual(true)
        expect(res.data === null).toEqual(false)
    })

    test('login success failed', async ()=>{
        repo.loginUser =jest.fn().mockReturnValue(null)
        let res = await userUC.login('testusername', '12356')
        expect(res.data === null).toEqual(false)
        expect(res.is_success).toBeFalsy()
        expect(res.message).toEqual('incorect username or password')
    })

    test('register success', async ()=>{
        repo.registerUser = jest.fn().mockReturnValue()
        let res = await userUC.register(
        {
        firstName: "firstname",
        lastName: "lastname",
        username : "testusername",
        password : "123456",
        phone: "082315512",
        email: "email@email.com",
        avatar: null,
        role_id: 2,
    })
        expect(res.is_success).toEqual(true)
        expect(res.data === null).toEqual(false)
    })
    test('register succress username', async ()=>{
        let res = await userUC.getUserByUsername('testusername', '123456')
        expect(res.is_success).toEqual(true)
        expect(res.data === null).toEqual(false)
    })
})