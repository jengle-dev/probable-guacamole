// resolvers seems to require Models
// define the query and mutation functionality to work with the mongoose models
const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You are not authenticated');
      }
      
      const currentUser = await User.findById(user._id);
      
      return currentUser;
    }
  },
  
  Mutation: {
    saveBook: async (_, { authors, description, title, bookId, image, link }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Please login and try again.');
      }
      
      const book = await Book.create({
        authors,
        description,
        title,
        bookId,
        image,
        link,
      });
      
      const currentUser = await User.findById(user._id);
      
      currentUser.savedBooks.push(book);
      await currentUser.save();
      
      return book;
    },
    
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = createToken(user);
      
      return { token, user };
    },
    
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new AuthenticationError('Invalid email and/or password');
      }
      
      const isPasswordValid = await user.validatePassword(password);
      
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid email and/or password');
      }
      
      const token = createToken(user);
      
      return { token, user };
    }
  }
};

module.exports = resolvers;
