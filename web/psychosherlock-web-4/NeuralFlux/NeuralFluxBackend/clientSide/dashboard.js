// Dashboard JavaScript
// Require authentication
requireAuth();

// Display username
const userInfo = getUserInfo();
if (userInfo) {
  document.getElementById("adminUsername").textContent = userInfo.username;
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

// Section navigation
document.querySelectorAll(".dashboard-nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;

    // Update active button
    document
      .querySelectorAll(".dashboard-nav-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Update active section
    document
      .querySelectorAll(".dashboard-section")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById(section).classList.add("active");

    // Load section data
    loadSectionData(section);
  });
});

// Load section data
function loadSectionData(section) {
  switch (section) {
    case "overview":
      loadDashboard();
      break;
    case "systems":
      loadSystems();
      break;
    case "employees":
      loadEmployees();
      break;
    case "messages":
      loadMessages();
      break;
    case "models":
      loadModels();
      break;
    case "training":
      loadTrainingJobs();
      break;
    case "settings":
      loadCurrentProfilePicture();
      break;
  }
}

// Load Dashboard Overview
async function loadDashboard() {
  try {
    const data = await API.getDashboard();
    const statsGrid = document.getElementById("statsGrid");

    statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
            </svg>
          </div>
        </div>
        <div class="stat-label">Total Systems</div>
        <div class="stat-value">${data.systems_summary?.total || 0}</div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
          <span style="color: var(--accent);">${
            data.systems_summary?.up || 0
          }</span> up · 
          <span style="color: #ef4444;">${
            data.systems_summary?.down || 0
          }</span> down
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
        </div>
        <div class="stat-label">Total Employees</div>
        <div class="stat-value">${data.employees_summary?.total || 0}</div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
          <span style="color: var(--accent);">${
            data.employees_summary?.active || 0
          }</span> active
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
          </div>
        </div>
        <div class="stat-label">Total Messages</div>
        <div class="stat-value">${data.messages_summary?.total || 0}</div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
          <span style="color: #fbbf24;">${
            data.messages_summary?.unread || 0
          }</span> unread · 
          <span style="color: #ef4444;">${
            data.messages_summary?.high_priority || 0
          }</span> urgent
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
        </div>
        <div class="stat-label">AI Models</div>
        <div class="stat-value">${data.models_summary?.total || 0}</div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
          <span style="color: var(--accent);">${
            data.models_summary?.deployed || 0
          }</span> deployed · 
          <span style="color: #fbbf24;">${
            data.models_summary?.testing || 0
          }</span> testing
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
        </div>
        <div class="stat-label">Training Jobs</div>
        <div class="stat-value">${data.training_jobs_summary?.total || 0}</div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
          <span style="color: #3b82f6;">${
            data.training_jobs_summary?.running || 0
          }</span> running · 
          <span style="color: #fbbf24;">${
            data.training_jobs_summary?.queued || 0
          }</span> queued · 
          <span style="color: var(--accent);">${
            data.training_jobs_summary?.completed || 0
          }</span> done
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading dashboard:", error);
    document.getElementById("statsGrid").innerHTML =
      '<div class="empty-state">Failed to load dashboard data</div>';
  }
}

// Load Systems
async function loadSystems() {
  try {
    const systems = await API.getSystems();
    const table = document.getElementById("systemsTable");

    if (!Array.isArray(systems) || systems.length === 0) {
      table.innerHTML = '<div class="empty-state">No systems found</div>';
      return;
    }

    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>IP Address</th>
            <th>Status</th>
            <th>Location</th>
            <th>Last Check</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${systems
            .map(
              (system) => `
            <tr>
              <td>${system.id}</td>
              <td>${system.name}</td>
              <td>${system.ip_address || "N/A"}</td>
              <td><span class="badge badge-${
                system.status === "up" ? "success" : "error"
              }">${system.status}</span></td>
              <td>${system.location || "N/A"}</td>
              <td>${
                system.last_check
                  ? new Date(system.last_check).toLocaleString()
                  : "N/A"
              }</td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn action-btn-edit" onclick="openEditSystemModal(${
                    system.id
                  })">Edit</button>
                </div>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error("Error loading systems:", error);
    document.getElementById("systemsTable").innerHTML =
      '<div class="empty-state">Failed to load systems</div>';
  }
}

// Load Employees
async function loadEmployees() {
  try {
    const employees = await API.getEmployees();
    const table = document.getElementById("employeesTable");

    if (!Array.isArray(employees) || employees.length === 0) {
      table.innerHTML = '<div class="empty-state">No employees found</div>';
      return;
    }

    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${employees
            .map(
              (emp) => `
            <tr>
              <td>${emp.id}</td>
              <td>${emp.name}</td>
              <td>${emp.position}</td>
              <td>${emp.department}</td>
              <td>${emp.email}</td>
              <td><span class="badge badge-${
                emp.status === "active" ? "success" : "warning"
              }">${emp.status}</span></td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn action-btn-edit" onclick="openEditEmployeeModal(${
                    emp.id
                  })">Edit</button>
                  <button class="action-btn action-btn-delete" onclick="deleteEmployee(${
                    emp.id
                  })">Delete</button>
                </div>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error("Error loading employees:", error);
    document.getElementById("employeesTable").innerHTML =
      '<div class="empty-state">Failed to load employees</div>';
  }
}

// Load Messages
async function loadMessages() {
  try {
    const messages = await API.getMessages();
    const table = document.getElementById("messagesTable");

    if (!Array.isArray(messages) || messages.length === 0) {
      table.innerHTML = '<div class="empty-state">No messages found</div>';
      return;
    }

    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${messages
            .map(
              (msg) => `
            <tr>
              <td>${msg.id}</td>
              <td>${msg.from || "N/A"}</td>
              <td>${msg.to || "N/A"}</td>
              <td>${msg.subject || "N/A"}</td>
              <td><span class="badge badge-${
                msg.priority === "high"
                  ? "error"
                  : msg.priority === "medium"
                  ? "warning"
                  : "info"
              }">${msg.priority || "N/A"}</span></td>
              <td><span class="badge badge-${
                msg.read ? "success" : "warning"
              }">${msg.read ? "Read" : "Unread"}</span></td>
              <td>${
                msg.timestamp ? new Date(msg.timestamp).toLocaleString() : "N/A"
              }</td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn action-btn-edit" onclick="viewMessage(${
                    msg.id
                  })">View</button>
                </div>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error("Error loading messages:", error);
    document.getElementById("messagesTable").innerHTML =
      '<div class="empty-state">Failed to load messages</div>';
  }
}

// Load Models
async function loadModels() {
  try {
    const models = await API.getModels();
    const table = document.getElementById("modelsTable");

    if (!Array.isArray(models) || models.length === 0) {
      table.innerHTML = '<div class="empty-state">No models found</div>';
      return;
    }

    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model Name</th>
            <th>Version</th>
            <th>Environment</th>
            <th>Status</th>
            <th>Accuracy</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          ${models
            .map(
              (model) => `
            <tr>
              <td>${model.id}</td>
              <td>${model.model_name || "N/A"}</td>
              <td>${model.version || "N/A"}</td>
              <td>${model.environment || "N/A"}</td>
              <td><span class="badge badge-${
                model.status === "deployed" ? "success" : "warning"
              }">${model.status || "N/A"}</span></td>
              <td>${model.accuracy ? model.accuracy + "%" : "N/A"}</td>
              <td>${
                model.last_updated
                  ? new Date(model.last_updated).toLocaleDateString()
                  : "N/A"
              }</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error("Error loading models:", error);
    document.getElementById("modelsTable").innerHTML =
      '<div class="empty-state">Failed to load models</div>';
  }
}

// Load Training Jobs
async function loadTrainingJobs() {
  try {
    const jobs = await API.getTrainingJobs();
    const table = document.getElementById("trainingTable");

    if (!Array.isArray(jobs) || jobs.length === 0) {
      table.innerHTML = '<div class="empty-state">No training jobs found</div>';
      return;
    }

    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Name</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>GPU Hours</th>
            <th>Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          ${jobs
            .map(
              (job) => `
            <tr>
              <td>${job.id}</td>
              <td>${job.job_name || "N/A"}</td>
              <td><span class="badge badge-${
                job.status === "completed"
                  ? "success"
                  : job.status === "running"
                  ? "info"
                  : "warning"
              }">${job.status || "N/A"}</span></td>
              <td>${
                job.start_time
                  ? new Date(job.start_time).toLocaleString()
                  : "N/A"
              }</td>
              <td>${
                job.end_time
                  ? new Date(job.end_time).toLocaleString()
                  : "In Progress"
              }</td>
              <td>${
                job.gpu_hours !== undefined ? job.gpu_hours.toFixed(2) : "N/A"
              }</td>
              <td>${job.cost !== undefined ? job.cost.toFixed(2) : "N/A"}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error("Error loading training jobs:", error);
    document.getElementById("trainingTable").innerHTML =
      '<div class="empty-state">Failed to load training jobs</div>';
  }
}

// Modal functions
function openModal(title, content) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = content;
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

// Edit System Modal
async function openEditSystemModal(id) {
  try {
    const system = await API.getSystem(id);
    openModal(
      "Edit System",
      `
      <form id="editSystemForm" class="form-grid">
        <div class="form-group">
          <label class="form-label">System ID</label>
          <input type="text" class="form-input" value="${system.id}" disabled>
        </div>
        <div class="form-group">
          <label class="form-label">Name</label>
          <input type="text" class="form-input" value="${system.name}" disabled>
        </div>
        <div class="form-group">
          <label for="systemStatus" class="form-label">Status</label>
          <select id="systemStatus" class="form-input">
            <option value="up" ${
              system.status === "up" ? "selected" : ""
            }>Up</option>
            <option value="down" ${
              system.status === "down" ? "selected" : ""
            }>Down</option>
            <option value="maintenance" ${
              system.status === "maintenance" ? "selected" : ""
            }>Maintenance</option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-small btn-secondary-small" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn-small btn-primary-small">Save Changes</button>
        </div>
      </form>
    `
    );

    document
      .getElementById("editSystemForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const status = document.getElementById("systemStatus").value;
        try {
          await API.updateSystem(id, { status });
          closeModal();
          loadSystems();
          showNotification("System updated successfully", "success");
        } catch (error) {
          showNotification(error.message || "Failed to update system", "error");
        }
      });
  } catch (error) {
    alert("Failed to load system details");
  }
}

// Add Employee Modal
function openAddEmployeeModal() {
  openModal(
    "Add Employee",
    `
    <form id="addEmployeeForm" class="form-grid">
      <div class="form-group">
        <label for="empName" class="form-label">Name</label>
        <input type="text" id="empName" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="empPosition" class="form-label">Position</label>
        <input type="text" id="empPosition" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="empDepartment" class="form-label">Department</label>
        <input type="text" id="empDepartment" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="empEmail" class="form-label">Email</label>
        <input type="email" id="empEmail" class="form-input" required>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-small btn-secondary-small" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-small btn-primary-small">Add Employee</button>
      </div>
    </form>
  `
  );

  document
    .getElementById("addEmployeeForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById("empName").value,
        position: document.getElementById("empPosition").value,
        department: document.getElementById("empDepartment").value,
        email: document.getElementById("empEmail").value,
      };
      try {
        await API.createEmployee(data);
        closeModal();
        loadEmployees();
        showNotification("Employee added successfully", "success");
      } catch (error) {
        showNotification(error.message || "Failed to add employee", "error");
      }
    });
}

// Edit Employee Modal
async function openEditEmployeeModal(id) {
  try {
    const emp = await API.getEmployee(id);
    openModal(
      "Edit Employee",
      `
      <form id="editEmployeeForm" class="form-grid">
        <div class="form-group">
          <label for="empName" class="form-label">Name</label>
          <input type="text" id="empName" class="form-input" value="${emp.name}" required>
        </div>
        <div class="form-group">
          <label for="empPosition" class="form-label">Position</label>
          <input type="text" id="empPosition" class="form-input" value="${emp.position}" required>
        </div>
        <div class="form-group">
          <label for="empDepartment" class="form-label">Department</label>
          <input type="text" id="empDepartment" class="form-input" value="${emp.department}" required>
        </div>
        <div class="form-group">
          <label for="empEmail" class="form-label">Email</label>
          <input type="email" id="empEmail" class="form-input" value="${emp.email}" required>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-small btn-secondary-small" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn-small btn-primary-small">Save Changes</button>
        </div>
      </form>
    `
    );

    document
      .getElementById("editEmployeeForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById("empName").value,
          position: document.getElementById("empPosition").value,
          department: document.getElementById("empDepartment").value,
          email: document.getElementById("empEmail").value,
        };
        try {
          await API.updateEmployee(id, data);
          closeModal();
          loadEmployees();
          showNotification("Employee updated successfully", "success");
        } catch (error) {
          showNotification(
            error.message || "Failed to update employee",
            "error"
          );
        }
      });
  } catch (error) {
    alert("Failed to load employee details");
  }
}

// Delete Employee
async function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    try {
      await API.deleteEmployee(id);
      loadEmployees();
      showNotification("Employee deleted successfully", "success");
    } catch (error) {
      showNotification(error.message || "Failed to delete employee", "error");
    }
  }
}

// Add Message Modal
function openAddMessageModal() {
  openModal(
    "New Message",
    `
    <form id="addMessageForm" class="form-grid">
      <div class="form-group">
        <label for="msgFrom" class="form-label">From</label>
        <input type="text" id="msgFrom" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="msgTo" class="form-label">To</label>
        <input type="text" id="msgTo" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="msgSubject" class="form-label">Subject</label>
        <input type="text" id="msgSubject" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="msgContent" class="form-label">Content</label>
        <textarea id="msgContent" class="form-input" rows="4" required></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-small btn-secondary-small" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-small btn-primary-small">Send Message</button>
      </div>
    </form>
  `
  );

  document
    .getElementById("addMessageForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        recipient: document.getElementById("msgTo").value,
        subject: document.getElementById("msgSubject").value,
        body: document.getElementById("msgContent").value,
      };
      try {
        await API.createMessage(data);
        closeModal();
        loadMessages();
        showNotification("Message sent successfully", "success");
      } catch (error) {
        showNotification(error.message || "Failed to send message", "error");
      }
    });
}

// View Message
async function viewMessage(id) {
  try {
    const msg = await API.getMessage(id);

    // Mark as read if unread
    if (!msg.read && msg.is_read === false) {
      try {
        await API.markMessageAsRead(id);
        // Reload messages to show updated read status
        setTimeout(() => loadMessages(), 1000);
      } catch (error) {
        console.error("Failed to mark message as read:", error);
      }
    }

    openModal(
      "Message Details",
      `
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">From</label>
          <div style="color: var(--text-primary);">${msg.from || "N/A"}</div>
        </div>
        <div class="form-group">
          <label class="form-label">To</label>
          <div style="color: var(--text-primary);">${msg.to || "N/A"}</div>
        </div>
        <div class="form-group">
          <label class="form-label">Subject</label>
          <div style="color: var(--text-primary);">${msg.subject || "N/A"}</div>
        </div>
        <div class="form-group">
          <label class="form-label">Priority</label>
          <div style="color: var(--text-primary);"><span class="badge badge-${
            msg.priority === "high"
              ? "error"
              : msg.priority === "medium"
              ? "warning"
              : "info"
          }">${msg.priority || "N/A"}</span></div>
        </div>
        <div class="form-group">
          <label class="form-label">Content</label>
          <div style="color: var(--text-primary); padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">${
            msg.body || "N/A"
          }</div>
        </div>
        <div class="form-group">
          <label class="form-label">Time</label>
          <div style="color: var(--text-primary);">${
            msg.timestamp ? new Date(msg.timestamp).toLocaleString() : "N/A"
          }</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-small btn-secondary-small" onclick="closeModal()">Close</button>
        </div>
      </div>
    `
    );
  } catch (error) {
    alert("Failed to load message");
  }
}

// Deploy Model Modal
function openDeployModelModal() {
  openModal(
    "Deploy Model",
    `
    <form id="deployModelForm" class="form-grid">
      <div class="form-group">
        <label for="modelName" class="form-label">Model Name</label>
        <input type="text" id="modelName" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="modelVersion" class="form-label">Version</label>
        <input type="text" id="modelVersion" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="modelEndpoint" class="form-label">Endpoint</label>
        <input type="text" id="modelEndpoint" class="form-input" required>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-small btn-secondary-small" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-small btn-primary-small">Deploy</button>
      </div>
    </form>
  `
  );

  document
    .getElementById("deployModelForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        model_name: document.getElementById("modelName").value,
        version: document.getElementById("modelVersion").value,
        endpoint: document.getElementById("modelEndpoint").value,
      };
      try {
        await API.deployModel(data);
        closeModal();
        loadModels();
        showNotification("Model deployed successfully", "success");
      } catch (error) {
        showNotification(error.message || "Failed to deploy model", "error");
      }
    });
}

// Add Training Job Modal
function openAddTrainingJobModal() {
  openModal(
    "New Training Job",
    `
    <form id="addTrainingJobForm" class="form-grid">
      <div class="form-group">
        <label for="jobModelName" class="form-label">Model Name</label>
        <input type="text" id="jobModelName" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="jobDataset" class="form-label">Dataset</label>
        <input type="text" id="jobDataset" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="jobEpochs" class="form-label">Epochs</label>
        <input type="number" id="jobEpochs" class="form-input" required>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-small btn-secondary-small" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-small btn-primary-small">Start Training</button>
      </div>
    </form>
  `
  );

  document
    .getElementById("addTrainingJobForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        model_name: document.getElementById("jobModelName").value,
        dataset: document.getElementById("jobDataset").value,
        epochs: parseInt(document.getElementById("jobEpochs").value),
      };
      try {
        await API.createTrainingJob(data);
        closeModal();
        loadTrainingJobs();
        showNotification("Training job started successfully", "success");
      } catch (error) {
        showNotification(
          error.message || "Failed to start training job",
          "error"
        );
      }
    });
}

// Change Password Form
document
  .getElementById("changePasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const errorDiv = document.getElementById("settingsError");
    const successDiv = document.getElementById("settingsSuccess");

    errorDiv.classList.remove("show");
    successDiv.classList.remove("show");

    if (newPassword !== confirmPassword) {
      errorDiv.textContent = "New passwords do not match";
      errorDiv.classList.add("show");
      return;
    }

    try {
      await API.changePassword(currentPassword, newPassword);
      successDiv.textContent = "Password changed successfully";
      successDiv.classList.add("show");
      document.getElementById("changePasswordForm").reset();
      setTimeout(() => successDiv.classList.remove("show"), 3000);
    } catch (error) {
      errorDiv.textContent =
        error.message ||
        "Failed to change password. Please check your current password.";
      errorDiv.classList.add("show");
    }
  });

// Notification system
function showNotification(message, type = "info") {
  // Create notification element if it doesn't exist
  let notification = document.getElementById("notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      font-weight: 500;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
      max-width: 400px;
    `;
    document.body.appendChild(notification);
  }

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
  };
  notification.style.backgroundColor = colors[type] || colors.info;
  notification.textContent = message;
  notification.style.opacity = "1";

  // Auto hide after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
  }, 3000);
}

// Load current profile picture
function loadCurrentProfilePicture() {
  const display = document.getElementById("profilePictureDisplay");

  // Always use admin.svg with cache-busting
  const imageUrl = `${window.location.origin}/NeuralFluxCorpAdministrationProtectedEndpoint/api/images/admin.svg`;
  const cacheBuster = new Date().getTime();
  const imageUrlWithCache = `${imageUrl}?t=${cacheBuster}`;

  display.innerHTML = `
    <div style="max-width: 400px; margin: 0 auto;">
      <object data="${imageUrlWithCache}" type="image/svg+xml" style="width: 100%; height: auto; max-height: 400px; border: 1px solid var(--border); border-radius: 0.5rem;">
        <img src="${imageUrlWithCache}" alt="Profile Picture" style="width: 100%; height: auto;" />
      </object>
    </div>
  `;
} // Image Upload Form Handler
document
  .getElementById("uploadImageForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("profileImage");
    const errorDiv = document.getElementById("uploadError");
    const successDiv = document.getElementById("uploadSuccess");

    errorDiv.classList.remove("show");
    successDiv.classList.remove("show");

    if (!fileInput.files || fileInput.files.length === 0) {
      errorDiv.textContent = "Please select a file";
      errorDiv.classList.add("show");
      return;
    }

    const file = fileInput.files[0];

    // Validate file type (client-side check)
    if (!file.name.toLowerCase().endsWith(".svg")) {
      errorDiv.textContent = "Only SVG files are allowed";
      errorDiv.classList.add("show");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      errorDiv.textContent = "File size must be less than 5MB";
      errorDiv.classList.add("show");
      return;
    }

    try {
      const result = await API.uploadImage(file);
      successDiv.textContent = result.message || "Image uploaded successfully";
      successDiv.classList.add("show");
      fileInput.value = "";

      // Update the displayed profile picture immediately (no need to store in localStorage)
      loadCurrentProfilePicture();

      setTimeout(() => {
        successDiv.classList.remove("show");
      }, 2000);

      showNotification("Profile picture updated successfully", "success");
    } catch (error) {
      errorDiv.textContent =
        error.message || "Failed to upload image. Please try again.";
      errorDiv.classList.add("show");
    }
  });

// Initial load
loadDashboard();
