const currentSession = async (req, res) => {
    res.send({
        user: req.user,
    });
};

export default {
    currentSession,
};