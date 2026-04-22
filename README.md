# Online Blog App

This is a simple online blogging application built with React, Azure Functions, MongoDB, and Bootstrap CSS.

## Project structure

- `backend/` - Azure Functions API server with Node.js runtime, MongoDB database connection, and blog endpoints.
- `frontend/` - React app built with Vite, Bootstrap styling, axios API client.

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally or connection string available
- Azure Functions Core Tools (optional, for local development)

## Quick Setup

### Backend Setup (Azure Functions)

1. Navigate to the backend directory and run setup:

**On Windows:**
```bash
cd backend
setup.bat
```

**On macOS/Linux:**
```bash
cd backend
bash setup.sh
```

Or manually:
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB connection and CORS origin
```

2. Start the Azure Functions locally:

```bash
npm start
```

The API will be available at `http://localhost:7071/api`

### Frontend Setup

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Configure the API endpoint in `frontend/.env` or the frontend will use the default local URL

3. Start the React frontend:

```bash
npm run dev
```

4. Open the frontend URL shown in the terminal (usually `http://localhost:5173`)

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/blogs` - Get all blogs (published only for viewers)
- `GET /api/blogs?published=true` - Get only published blogs
- `POST /api/blogs` - Create a new blog (Editor/Admin only)
- `PUT /api/blogs/{id}` - Update a blog (Editor/Admin only)
- `PATCH /api/blogs/{id}/publish` - Toggle publish status (Editor/Admin only)
- `DELETE /api/blogs/{id}` - Delete a blog (Admin only)

## Role-Based Access Control

- **Viewer**: Can view published blogs only (default role)
- **Editor**: Can create, read, update, and publish blogs
- **Admin**: Full access including deletion

Pass the role via the `x-user-role` header in API requests.

## Backend Documentation

For detailed backend documentation, see [backend/README.md](backend/README.md)

## Deployment

### Deploy Backend to Azure

```bash
# Login to Azure
az login

# Create a resource group
az group create --name myResourceGroup --location eastus

# Create a storage account
az storage account create --name mystorageaccount --location eastus --resource-group myResourceGroup --sku Standard_LRS

# Create a Function App
az functionapp create --resource-group myResourceGroup --consumption-plan-location eastus --runtime node --runtime-version 20 --functions-version 4 --name myBlogFunctionApp --storage-account mystorageaccount

# Deploy the functions
func azure functionapp publish myBlogFunctionApp

# Set environment variables
az functionapp config appsettings set --name myBlogFunctionApp --resource-group myResourceGroup --settings MONGO_URI="your-mongo-connection-string" CORS_ORIGIN="your-frontend-url"
```

### Deploy Frontend

You can deploy the frontend to Azure Static Web Apps, Netlify, Vercel, or any static hosting service.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the MONGO_URI in backend/.env or local.settings.json

### CORS Issues
- Update CORS_ORIGIN in backend/.env or local.settings.json to match your frontend URL
- Ensure the frontend API URL is configured correctly

### Functions Not Starting
- Run `npm install` to ensure all dependencies are installed
- Check that port 7071 is not already in use
- Review the terminal output for specific error messages

## API Endpoints

- `GET /api/blogs` - list all blogs
- `POST /api/blogs` - create a blog
- `PUT /api/blogs/:id` - update a blog
- `DELETE /api/blogs/:id` - delete a blog

## Notes

- The frontend calls the backend at `http://localhost:5000`.
- Ensure MongoDB is running and reachable before starting the backend.
