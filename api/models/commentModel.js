//commentModel.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Add an index on the `userId` and `recipeId` fields for faster lookups
// (if comments are frequently queried based on these fields)
commentSchema.index({ userId: 1, recipeId: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;