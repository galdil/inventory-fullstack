import { Schema } from 'mongoose';
import { type ISpeaker } from '../../../../../common/sharedTypes';

export const SpeakerProductSchema = new Schema<ISpeaker>({
  brand: {
    type: String,
  },
  wireless: {
    type: Boolean,
  },
  color: {
    type: String,
  },
});
