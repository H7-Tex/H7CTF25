// Admin API Utility - Only for admin pages
// DO NOT include this file in public pages

const API_BASE_PATH = "/NeuralFluxCorpAdministrationProtectedEndpoint";
const REQUIRED_HEADER_KEY = "X-NEURALEND-KEY";
const REQUIRED_HEADER_VALUE = "97b213d150a41128ae4123500d506d6422613feef8";

// Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem("adminToken");
}

// Check if user is authenticated
function isAuthenticated() {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// Redirect to login if not authenticated
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// Make authenticated API request
async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();

  const defaultHeaders = {
    "Content-Type": "application/json",
    [REQUIRED_HEADER_KEY]: REQUIRED_HEADER_VALUE,
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  // Handle unauthorized
  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
    throw new Error("Unauthorized");
  }

  return response;
}

// API methods
const API = {
  // Dashboard
  async getDashboard() {
    const response = await apiRequest(`${API_BASE_PATH}/api/dashboard`);
    return response.json();
  },

  // Systems
  async getSystems() {
    const response = await apiRequest(`${API_BASE_PATH}/api/systems`);
    const data = await response.json();
    return data.systems || [];
  },

  async getSystem(id) {
    const response = await apiRequest(`${API_BASE_PATH}/api/systems/${id}`);
    return response.json();
  },

  async updateSystem(id, data) {
    const response = await apiRequest(`${API_BASE_PATH}/api/systems/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update system");
    }
    return response.json();
  },

  // Employees
  async getEmployees() {
    const response = await apiRequest(`${API_BASE_PATH}/api/employees`);
    const data = await response.json();
    return data.employees || [];
  },

  async getEmployee(id) {
    const response = await apiRequest(`${API_BASE_PATH}/api/employees/${id}`);
    return response.json();
  },

  async createEmployee(data) {
    const response = await apiRequest(`${API_BASE_PATH}/api/employees`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create employee");
    }
    return response.json();
  },

  async updateEmployee(id, data) {
    const response = await apiRequest(`${API_BASE_PATH}/api/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update employee");
    }
    return response.json();
  },

  async deleteEmployee(id) {
    const response = await apiRequest(`${API_BASE_PATH}/api/employees/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete employee");
    }
    return response.json();
  },

  // Messages
  async getMessages() {
    const response = await apiRequest(`${API_BASE_PATH}/api/messages`);
    const data = await response.json();
    return data.messages || [];
  },

  async getMessage(id) {
    const response = await apiRequest(`${API_BASE_PATH}/api/messages/${id}`);
    return response.json();
  },

  async createMessage(data) {
    const response = await apiRequest(`${API_BASE_PATH}/api/messages`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send message");
    }
    return response.json();
  },

  async markMessageAsRead(id) {
    const response = await apiRequest(
      `${API_BASE_PATH}/api/messages/${id}/read`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to mark message as read");
    }
    return response.json();
  },

  // Models
  async getModels() {
    const response = await apiRequest(`${API_BASE_PATH}/api/models`);
    const data = await response.json();
    return data.deployments || [];
  },

  async deployModel(data) {
    const response = await apiRequest(`${API_BASE_PATH}/api/models/deploy`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to deploy model");
    }
    return response.json();
  },

  // Usage
  async getUsage() {
    const response = await apiRequest(`${API_BASE_PATH}/api/usage`);
    return response.json();
  },

  // Training Jobs
  async getTrainingJobs() {
    const response = await apiRequest(`${API_BASE_PATH}/api/training-jobs`);
    const data = await response.json();
    return data.training_jobs || [];
  },

  async createTrainingJob(data) {
    const response = await apiRequest(`${API_BASE_PATH}/api/training-jobs`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to start training job");
    }
    return response.json();
  },

  // Admin
  async changePassword(currentPassword, newPassword) {
    const response = await apiRequest(
      `${API_BASE_PATH}/api/admin/change-password`,
      {
        method: "POST",
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      }
    );
    return response.json();
  },

  // Image Upload
  async uploadImage(file) {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_PATH}/api/upload-image`, {
      method: "POST",
      headers: {
        [REQUIRED_HEADER_KEY]: REQUIRED_HEADER_VALUE,
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "login.html";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to upload image");
    }

    return response.json();
  },

  // Get Image URL
  getImageUrl(imageId) {
    return `${API_BASE_PATH}/api/images/${imageId}`;
  },
};

// Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
  }
}

// Get user info from token
function getUserInfo() {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      username: payload.username,
      email: payload.email,
      profile_picture: payload.profile_picture,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}
