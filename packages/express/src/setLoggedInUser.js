export default (req, user) => {
    req.loggedInUser = user || null;
};

