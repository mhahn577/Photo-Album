import * as mongoose from 'mongoose';

export interface IPhoto extends mongoose.Document {
  name: string;
  description: string;
  imageURL: string;
}

let photoSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true, 'Photo name is required!'],
    minlength:[3, 'Photo name must be at least 3 characters!']
  },
  description: {
    type: String,
    required: [true, 'Photo description is required!']
  },
  imageURL: {
    type: String,
    required: [false, 'Photo URL is not required.']
  }
});

export default mongoose.model<IPhoto>('Photo', photoSchema);
