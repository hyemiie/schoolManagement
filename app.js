const express = require("express");
const createDatabase = require("./db/createDB");
const classRoutes = require("./Routes/ClassRoutes");
const studentRoutes = require("./Routes/StudentRoutes");
const teacherRoutes = require("./Routes/TeacherRoutes");
const adminRoutes = require("./Routes/AdminRoutes");
const attendanceRoutes = require("./Routes/AttendanceRoutes");

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

(async function initializeApp() {
  try {
    const db = await createDatabase();
    console.log("Database setup completed!");

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    app.use("/api", classRoutes);
    app.use("/api", studentRoutes);
    app.use("/api", studentRoutes);
    app.use("/api", adminRoutes);
    app.use("/api", teacherRoutes);
    app.use("/api", attendanceRoutes);
  } catch (error) {
    console.error("Error during app initialization:", error);
  }
})();
