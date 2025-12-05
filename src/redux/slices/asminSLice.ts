// adminSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAdminState {
  selectedModule: "courses" | "enrollments" | "assignments";
}

const initialState: IAdminState = {
  selectedModule: "courses",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setModule(state, action: PayloadAction<IAdminState["selectedModule"]>) {
      state.selectedModule = action.payload;
    },
  },
});

export const { setModule } = adminSlice.actions;
export default adminSlice.reducer;
