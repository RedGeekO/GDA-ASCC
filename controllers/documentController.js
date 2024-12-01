const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des documents" });
    }
};

exports.getDocumentById = async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);
        if (document) {
            res.json(document);
        } else {
            res.status(404).json({ message: "Document non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du document" });
    }
};

exports.createDocument = async (req, res) => {
    try {
        const newDocument = await Document.create(req.body);
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du document" });
    }
};

exports.updateDocument = async (req, res) => {
    try {
        const [updated] = await Document.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDocument = await Document.findByPk(req.params.id);
            return res.json(updatedDocument);
        }
        throw new Error('Document non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const deleted = await Document.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send("Document supprimé");
        }
        throw new Error('Document non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};