
# Frontend Setup

## ⚙️ Prerequisites

Make sure you have the following installed before proceeding:

- **Node.js** (version 16 or later recommended)  
  [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- Access to the backend API (running locally or remotely)
- A `.env` file in the root directory (see step 2)

## 1️⃣ Install Dependencies

Install all required dependencies using npm:

```sh
npm install
```

## 2️⃣ Configure Backend URL

- Open the `.env` file and update the `VITE_BACKEND_URL` with the correct backend URL (e.g., `http://localhost:6173` or your configured backend address):

```env
VITE_BACKEND_URL=http://localhost:6173
```

## 3️⃣ Run the Development Server

Start the development server:

```sh
npm run dev
```

The application will be available at [http://localhost:7173/](http://localhost:7173/).
