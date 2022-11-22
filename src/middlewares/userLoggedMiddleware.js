function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;
    console.log(res.locals);
    console.log(res.session);
  

    if(req.session && req.session.userLogged) {
    console.log("ingrese al if")
    console.log(req.session.userLogged); 
        res.locals.isLogged = true;
    };

    next();
}

module.exports = userLoggedMiddleware 

// && req.session.userLogged