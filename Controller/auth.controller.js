
exports.loginPage = async(req,res)=>{
    try {
        res.render('auth/login')
    } catch (error) {
        console.log(error)
    }
}


exports.login = async(req,res)=>{
    try {

        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}