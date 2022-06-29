const roomModel = require("../models/room-model");

class RoomService {
  async create(payload) {
    const { topic, roomType, ownerId } = payload;
    try {
      const room = await roomModel.create({
        topic,
        roomType,
        ownerId,
        speakers: [ownerId],
      });
      return room;
    } catch (error) {
      return res.status(500).json({ message: "Internal server Error" });
    }
  }
  async getAllRooms(types) {
    try {
      const rooms = await roomModel.find({ roomType: { $in: types } }).populate('speakers').populate('ownerId').exec();
      return rooms;
    } catch (error) {
      return res.status(500).json({ message: "Internal server Error" });
    }
  }
}

module.exports = new RoomService();
