import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  completedLessons: string[]; // lesson._id গুলা track করবে
}

const initialState: ProgressState = {
  completedLessons: [],
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    markLessonCompleted: (state, action: PayloadAction<string>) => {
      if (!state.completedLessons.includes(action.payload)) {
        state.completedLessons.push(action.payload);
      }
    },
    resetProgress: (state) => {
      state.completedLessons = [];
    },
  },
});

export const { markLessonCompleted, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
