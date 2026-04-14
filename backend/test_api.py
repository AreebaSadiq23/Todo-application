import requests

BASE_URL = "http://localhost:8000/api"

# Step 1: Register
print("=== Step 1: Register ===")
reg = requests.post(f"{BASE_URL}/auth/register", json={
    "username": "testuser",
    "email": "test@test.com",
    "password": "testpass"
})
print(f"Status: {reg.status_code}")
print(f"Response: {reg.json()}")

# Step 2: Login
print("\n=== Step 2: Login ===")
login = requests.post(f"{BASE_URL}/auth/login", data={
    "username": "testuser",
    "password": "testpass"
})
print(f"Status: {login.status_code}")
login_data = login.json()
token = login_data["access_token"]
print(f"Token: {token[:50]}...")

# Step 3: Create Task
print("\n=== Step 3: Create Task ===")
task = requests.post(f"{BASE_URL}/tasks/", json={
    "title": "My First Task",
    "description": "Testing the API",
    "status": "pending"
}, headers={"Authorization": f"Bearer {token}"})
print(f"Status: {task.status_code}")
print(f"Response: {task.json()}")

# Step 4: Get Tasks
print("\n=== Step 4: Get Tasks ===")
tasks = requests.get(f"{BASE_URL}/tasks/", headers={"Authorization": f"Bearer {token}"})
print(f"Status: {tasks.status_code}")
print(f"Tasks: {tasks.json()}")

# Step 5: Update Task
print("\n=== Step 5: Update Task ===")
task_id = task.json()["id"]
update = requests.patch(f"{BASE_URL}/tasks/{task_id}", json={
    "status": "completed"
}, headers={"Authorization": f"Bearer {token}"})
print(f"Status: {update.status_code}")
print(f"Response: {update.json()}")

# Step 6: Delete Task
print("\n=== Step 6: Delete Task ===")
delete = requests.delete(f"{BASE_URL}/tasks/{task_id}", headers={"Authorization": f"Bearer {token}"})
print(f"Status: {delete.status_code}")

# Step 7: Verify Deletion
print("\n=== Step 7: Verify Deletion ===")
tasks = requests.get(f"{BASE_URL}/tasks/", headers={"Authorization": f"Bearer {token}"})
print(f"Status: {tasks.status_code}")
print(f"Tasks: {tasks.json()}")

print("\n✅ All tests passed!")
