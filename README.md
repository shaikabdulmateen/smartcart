# SmartCart — Full-Stack E-Commerce Application

SmartCart is a full-stack e-commerce web application built to demonstrate practical skills in frontend development, backend API development, authentication, database management, and deployment.

The project uses **React + TypeScript** for the frontend and **Django REST Framework** for the backend. It includes JWT authentication, product browsing, a shopping cart, order placement, stock management, Django Admin, and Cloudinary image storage.

## Live Demo

- **Frontend:** https://smartcart-two-gamma.vercel.app/
- **Backend API:** https://smartcart-backend-kf8g.onrender.com/api/products/
- **Django Admin:** https://smartcart-backend-kf8g.onrender.com/admin/

> Note: The backend may take a little time to respond if the hosting service has been idle.

## Features

- Browse products and product categories
- User registration and login
- JWT-based authentication using access and refresh tokens
- Protected cart and order endpoints
- Add products to the cart
- Update cart item quantities and remove items
- Validate requested quantities against available stock
- Place orders using cart items and a delivery address
- Track order status: pending, confirmed, shipped, delivered, or cancelled
- Decrease product stock when an order is placed
- Restore stock when a pending order is cancelled
- Manage products and orders through Django Admin
- Store product images using Cloudinary
- Deploy the frontend and backend separately

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Axios
- HTML and CSS

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- Django CORS Headers

### Database and Storage
- SQLite for local development (when `DATABASE_URL` is not configured)
- PostgreSQL for production
- Cloudinary for product image storage

### Deployment and Tools
- Vercel — frontend hosting
- Render — backend hosting and PostgreSQL
- Git and GitHub — version control

## Project Structure

```text
SmartCart/
├── backend/
│   ├── config/
│   ├── users/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── manage.py
│   └── build.sh
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vercel.json
├── requirements.txt
└── .gitignore
```

> The `.venv`, `node_modules`, local database, environment files, and generated build files should not be committed to GitHub.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/shaikabdulmateen/smartcart.git
cd smartcart
```

### 2. Set up the backend

Create and activate a virtual environment from the project root.

**Windows (PowerShell):**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Move into the backend directory:

```bash
cd backend
```

Apply migrations and create a local admin user:

```bash
python manage.py migrate
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will usually be available at `http://127.0.0.1:8000/`.

Keep this terminal running. Open another terminal for the frontend.

### 3. Set up the frontend

From the project root, move into the frontend directory:

```bash
cd frontend
```

Install JavaScript dependencies:

```bash
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start the frontend:

```bash
npm run dev
```

Vite will show the local frontend URL, usually `http://localhost:5173/`.

## Environment Variables

Configure these values in your local environment or deployment dashboard. Never commit real secrets to GitHub.

| Variable | Purpose |
|---|---|
| `SECRET_KEY` | Django secret key |
| `DEBUG` | Set to `False` in production |
| `DATABASE_URL` | PostgreSQL connection URL for production |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_USERNAME` | Optional username used by the project's admin creation command |
| `ADMIN_PASSWORD` | Password used by that command, if needed |
| `VITE_API_BASE_URL` | Frontend API base URL |

For local development, the frontend `.env` file can use:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

For the deployed frontend, it should point to the deployed backend API base URL.

## API Endpoints

The API routes below reflect the main route groups configured in the project. Individual actions and HTTP methods depend on the corresponding app URL configuration.

| Endpoint | Purpose |
|---|---|
| `/api/products/` | List products |
| `/api/users/` | User-related endpoints, including registration |
| `/api/users/login/` | Obtain JWT access and refresh tokens |
| `/api/users/token/refresh/` | Refresh an access token |
| `/api/cart/` | Access the authenticated user's cart |
| `/api/orders/` | Access and create orders |

Protected endpoints require a valid access token:

```http
Authorization: Bearer <access-token>
```

## Order and Inventory Flow

1. A user signs in and receives JWT tokens.
2. The user adds products to the cart.
3. The backend checks the requested quantity against available stock.
4. The user submits an order with a delivery address.
5. The backend creates the order and its order items.
6. Product stock is reduced and the cart is cleared.
7. A pending order can be cancelled; the stock is restored according to the implemented order logic.

Order status values include `pending`, `confirmed`, `shipped`, `delivered`, and `cancelled`.

## Deployment

- **Frontend:** deployed on Vercel.
- **Backend:** deployed on Render using Gunicorn.
- **Database:** PostgreSQL hosted on Render.
- **Product images:** stored on Cloudinary.
- **Static files:** collected during the Render build and served using WhiteNoise.

The backend build script installs dependencies, collects static files, and applies database migrations.

## Troubleshooting Notes

- **CORS errors:** Check the backend's allowed frontend origins and deploy the updated backend configuration.
- **Frontend API errors:** Confirm `VITE_API_BASE_URL` is set correctly in Vercel and redeploy after changing it.
- **Direct route returns 404:** Check the Vercel SPA rewrite configuration in `frontend/vercel.json`.
- **Admin login fails in production:** A local Django superuser is stored in the local database, not in the production PostgreSQL database. Create the production admin user securely in the production environment.
- **Product images return 404:** Confirm Cloudinary environment variables and Django storage configuration are set, then re-upload images if they were stored on the old local filesystem.
- **Protected API returns 401:** Sign in and send the access token in the `Authorization` header.

## What I Learned

- Building REST APIs with Django REST Framework
- Connecting a React + TypeScript frontend to a Django backend
- Implementing JWT authentication and token refresh
- Designing product, cart, and order data models
- Validating stock and handling order-related inventory updates
- Using environment variables for configuration and secrets
- Connecting PostgreSQL and Cloudinary
- Deploying a frontend and backend separately
- Debugging CORS, routing, authentication, and media-storage issues
- Using Git and GitHub for version control

## Future Improvements

- Add product search, filters, sorting, and pagination
- Add payment gateway integration
- Improve automated test coverage
- Add email notifications for order updates
- Add a dedicated admin dashboard
- Add CI/CD checks and production monitoring

## Author

**Shaik Abdul Mateen**

- GitHub: [shaikabdulmateen](https://github.com/shaikabdulmateen)

---

If you find this project useful, feel free to explore the code and share feedback.
