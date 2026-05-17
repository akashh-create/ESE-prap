import mongoose from "mongoose";

const SavedShortlistSchema = new mongoose.Schema(
  {
    job: {
      requiredSkills: { type: [String], required: true },
      preferredSkills: { type: [String], default: [] },
      minExperience: { type: Number, required: true, min: 0 }
    },
    candidates: [
      {
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Candidate",
          required: true
        },
        matchScore: Number,
        matchedSkills: [String],
        rank: String,
        aiRecommendation: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("SavedShortlist", SavedShortlistSchema);
