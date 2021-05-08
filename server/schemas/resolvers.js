//import models
const { User} = require('../models');

const resolvers = {
Query:{
    users: async () => {
        return await User.find().select('-__v -password').populate('savedBooks');
    },

    user: async (parent, { username }) => {
        return await User.findOne({ username }).select('-__v -password').populate('savedBooks');
    }
}
};

module.exports = resolvers;

