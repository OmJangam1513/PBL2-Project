const Notification = require('../models/Notification');

// Send Notification (Only Department Head)
exports.sendNotification = async (req, res) => {
    try {
        const { message, recipients } = req.body;

        if (!message || !recipients || recipients.length === 0) {
            return res.status(400).json({ message: "Message and recipients are required" });
        }

        const notifications = recipients.map(userId => ({
            user: userId,
            message
        }));

        await Notification.insertMany(notifications);
        res.status(201).json({ message: "Notifications sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get Notifications
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Mark Notification as Read
exports.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
