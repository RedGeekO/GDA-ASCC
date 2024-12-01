const Reminder = require('../models/Reminder');

exports.getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.findAll();
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des rappels" });
    }
};

exports.getReminderById = async (req, res) => {
    try {
        const reminder = await Reminder.findByPk(req.params.id);
        if (reminder) {
            res.json(reminder);
        } else {
            res.status(404).json({ message: "Rappel non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du rappel" });
    }
};

exports.createReminder = async (req, res) => {
    try {
        const newReminder = await Reminder.create(req.body);
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du rappel" });
    }
};

exports.updateReminder = async (req, res) => {
    try {
        const [updated] = await Reminder.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedReminder = await Reminder.findByPk(req.params.id);
            return res.json(updatedReminder);
        }
        throw new Error('Rappel non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteReminder = async (req, res) => {
    try {
        const deleted = await Reminder.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send("Rappel supprimé");
        }
        throw new Error('Rappel non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};