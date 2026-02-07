
exports.loginPage = async(req,res)=>{
    try {
        res.render('auth/login')
    } catch (error) {
        console.log(error)
    }
}


exports.login = async(req,res)=>{
    try {
       req.flash('success','Wellcome Back!!!!')
       console.log(req.flash)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}



// logout 

exports.logOut = async(req,res)=>{
    try {
        req.session.destroy(()=>{
            res.clearCookie('user');
            res.redirect('/user/login')
        })
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/')
    }
}



// profilepage

exports.profilepage = async(req,res)=>{
    try {
        res.render('profile')
    } catch (error) {
        console.log(error)
    }

}