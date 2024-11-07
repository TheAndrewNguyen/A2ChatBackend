const { sendMessage } = require('../services/messageService');

const handleSendMessage = async (req, res) => {
  try {
    console.log('2')
    const { messageContent, userId, timestamp } = req.body;
    const { lobbyCode } = req.params;
    
    await sendMessage(messageContent, userId, timestamp, lobbyCode);
    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { handleSendMessage };
