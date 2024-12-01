const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des messages" });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ message: "Message non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du message" });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const newMessage = await Message.create(req.body);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du message" });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const [updated] = await Message.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedMessage = await Message.findByPk(req.params.id);
            return res.json(updatedMessage);
        }
        throw new Error('Message non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const deleted = await Message.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send("Message supprimé");
        }
        throw new Error('Message non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};