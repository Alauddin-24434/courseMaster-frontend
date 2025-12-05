import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface EnrolledCourse {
  courseId: string
  title: string
  progress: number
  lastAccessed: string
}

interface EnrollmentState {
  enrolledCourses: EnrolledCourse[]
}

const initialState: EnrollmentState = {
  enrolledCourses: [],
}

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrolledCourses: (state, action: PayloadAction<EnrolledCourse[]>) => {
      state.enrolledCourses = action.payload
    },
    updateProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const course = state.enrolledCourses.find((c) => c.courseId === action.payload.courseId)
      if (course) {
        course.progress = action.payload.progress
        course.lastAccessed = new Date().toISOString()
      }
    },
  },
})

export const { setEnrolledCourses, updateProgress } = enrollmentSlice.actions
export default enrollmentSlice.reducer
