const Chat = require("../models/Chat");
const Session = require("../models/Session");

exports.getSesionsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const session = await Session.find({ user: userId });

        const sessionsWithChats = await Promise.all(
            session.map(async (session) => {
                const chats = await Chat.find({ session: session._id })
                return {
                    sessionId: session._id,
                    chats
                }
            })
        );

        return res.status(200).json({
            success: true,
            sessions: sessionsWithChats
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}