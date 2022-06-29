const RoomDto = require('../dtos/room-dtos');
const roomServices = require("../services/room-services");

class RoomsController{
    async create(req,res){
        const {topic,roomType} = req.body;
        console.log(req.body);
        if(!topic || !roomType){
            return res.status(400).json({message:'All fields are required'});
        }
        const room = await roomServices.create({topic,roomType,ownerId:req.user._id});
        return res.json(new RoomDto(room));
    }
    async index(req,res){
        const rooms = await roomServices.getAllRooms('open');
        const allRooms = rooms.map(room => new RoomDto(room));
        return res.json(allRooms);
    }
}

module.exports = new RoomsController();