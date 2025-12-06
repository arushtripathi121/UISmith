exports.getResponse = async (req, res) => {
    try {
        const { default: geminiResponse } = await import("../helper/geminiResponse.mjs");
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(401).json({
                success: false,
                message: "no prompt found"
            })
        }

        const response = await geminiResponse(prompt);

        if (!response == {} || response.length == 0) {
            return res.status(401).json({
                success: 'false',
                message: 'API error',
            })
        }

        return res.status(200).json({
            success: true,
            message: "request successfull",
            response
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