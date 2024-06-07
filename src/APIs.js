import { Public } from "@mui/icons-material";

// Define a class to hold API URLs
class ApiUrls {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1";
    this.endpoints = {
      rooms: `${this.baseUrl}/rooms`,
      login: `${this.baseUrl}/admin/login`,
      getTeachers: `${this.baseUrl}/teachers`,
      getCreate: `${this.baseUrl}/`,
      getAllSessions: `${this.baseUrl}/teacherSessions`,
      getGlobSessions: `${this.baseUrl}/sessions`,
      getPositions: `${this.baseUrl}/positions`,
      getDepartments: `${this.baseUrl}/departments/`,
      getLevels: `${this.baseUrl}/levels/`,
      getSpeciality: `${this.baseUrl}/specialties/`,
      getSemester: `${this.baseUrl}/semesters/`,
      getSection: `${this.baseUrl}/sections/`,
      getDayTypes: `${this.baseUrl}/offDayTypes/`,
      // Add more endpoints as needed
    };
  }

  // Method to get a specific API URL
  getUrl(endpointName) {
    return this.endpoints[endpointName];
  }
}

// Export the class
export default ApiUrls;
