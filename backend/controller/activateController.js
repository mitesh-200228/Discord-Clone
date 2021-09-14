class activateController{
    async activate(){
        res.json({message:'OK'});
    }
}

module.exports = new activateController();