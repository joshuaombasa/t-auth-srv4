import mongoose from 'mongoose';

interface UserAttrs {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

const store = (attrs: UserAttrs) => {
 return new User(attrs)
}

const User = mongoose.model('User', userSchema);

export { User, store };
