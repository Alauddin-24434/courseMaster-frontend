// lib/api.ts
import axios from "axios";

const API_BASE = "https://coursemaster-backend-production.up.railway.app/api/v1"

export async function getCourseById(courseId: string) {
  try {
    const res = await axios.get(`${API_BASE}/courses/${courseId}`);
    if (res.status === 200) {
      return res.data.data; // assume backend structure { data: course }
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch course:", err);
    return null;
  }
}
