function viewAll(req, res){
    res.render('prueba', {
        name: req.query.name
    })
}

export default {
    viewAll
}