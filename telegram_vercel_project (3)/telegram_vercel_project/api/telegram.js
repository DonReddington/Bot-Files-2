const { Telegraf } = require('telegraf');

const BOT_TOKEN = '6557451093:AAFRTYBbjDdHRyETzrCJZrDxRwoOrBRhCmw';
const bot = new Telegraf(BOT_TOKEN);

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const chat = await bot.telegram.getChat('-1001234567890');
            const memberCount = await bot.telegram.getChatMemberCount('-1001234567890');
            const groupInfo = {
                chatId: chat.id,
                title: chat.title,
                memberCount: memberCount,
                username: chat.username,
            };
            res.status(200).json([groupInfo]);
        } catch (error) {
            res.status(500).json({ error: Failed to fetch group data: ${error.message} });
        }
    } else if (req.method === 'POST') {
        const { chatId, message } = req.body;
        if (!chatId || !message) {
            res.status(400).json({ error: 'chatId and message are required' });
            return;
        }
        try {
            await bot.telegram.sendMessage(chatId, message);
            res.status(200).json({
                success: true,
                data: { chatId, message, timestamp: new Date().toISOString() },
            });
        } catch (error) {
            res.status(500).json({ error: Failed to send message: ${error.message} });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};