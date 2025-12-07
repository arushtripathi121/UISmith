const Chat = require("../models/Chat");
const Session = require("../models/Session");

exports.getResponse = async (req, res) => {
    try {
        const { default: geminiResponse } = await import("../helper/geminiResponse.mjs");
        const { prompt, sessionId } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "no prompt found"
            })
        }

        const userId = req.user._id;

        const response = await geminiResponse(prompt);

        if (!response == {} || response.length == 0) {
            return res.status(401).json({
                success: 'false',
                message: 'API error',
            })
        }

        let finalSessionId = sessionId;

        if (!sessionId) {
            const newSession = await Session.create({
                user: userId
            });

            finalSessionId = newSession._id;
        }

        const chat = await Chat.create({
            prompt,
            response,
            session: finalSessionId,
        })

        return res.status(200).json({
            success: true,
            message: "request successfull",
            sessionId: finalSessionId,
            chat
        })
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            success: 'false',
            message: 'Internal server error',
        })
    }
}