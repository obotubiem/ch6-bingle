module.exports = {
    isAdmin : (req, res, next)=>{
        if(res.user.is_admin == false){
            return next()
        } return res.json({ error: 'Insufficient privileges for this operation' })
    }
    
}