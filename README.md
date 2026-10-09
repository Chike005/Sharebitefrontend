# Sharebitee Frontend 

# Project Name - ShareBite Management Frontend

This is the frontend for the Donation Management System, built using **React (Vite)**, **TypeScript**, and **Material UI**. It provides separate dashboards for **Donors, Admins, and Receivers** to manage donations efficiently.

## 🚀 Features
- Donor Dashboard: Manage donations, view history, and upload proofs.
- Admin Dashboard: Oversee donations, users, and manage site settings.
- Receiver Dashboard: Reserve donations, track receipts, and confirm deliveries.
- Authentication: Secure login and registration.
- API Integration: Communicates with the backend Django API.
- Responsive UI: Material UI components for a clean and professional design.

## 🛠 Tech Stack
- **React** (Vite for fast development)
- **TypeScript** (for type safety)
- **Material UI** (for styling and UI components)
- **React Router** (for navigation)
- **Axios** (for API requests)

## 📦 Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the frontend directory with:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
   If unset, the frontend uses `http://localhost:8000/api` for local development.
4. **Start the development server:**
   ```sh
   npm run dev
   ```

### Collection-point demo

Run the Django API and apply its migrations first; migration `0007` seeds three
illustrative, staffed collection points around Manchester. The donation form
requires selecting one of these points by card, without requesting location
permission. The optional map is shown only when `VITE_GOOGLE_MAPS_API_KEY` is
configured; cards remain fully usable without it.

Optional `.env` setting:

```env
VITE_GOOGLE_MAPS_API_KEY=your-restricted-browser-key
```

Restrict any Google Maps browser key by allowed referrers and the required Maps
JavaScript API in Google Cloud. Never commit a real key. New donations begin as
**Awaiting drop-off**. An administrator confirms they have arrived at the chosen
point, changing the workflow to **Received at collection point**; receivers can
reserve only after that confirmation. The point and its address appear in the
donation summary and are saved with the donation.

**Portfolio demo — collection points are illustrative; no real donations are
accepted.** The seeded location names, addresses, opening hours and coordinates
are fictional demo information.

Donors can optionally attach a JPG, PNG or WebP photo (up to 5 MB) while
creating a donation. The image is previewed before submission and appears in
the donation details; it is distinct from the later proof-of-donation upload.

### Staff admin dashboard

The existing `/dashboard` route is restricted to authenticated staff accounts.
The dashboard lists donations by their donation status (`Pending` or
`Successful`) and collection-point status (`Awaiting drop-off` or
`Received at collection point`). Staff can confirm receipt at the donation's
selected collection point after confirming the action; receivers can reserve
the donation only after it is marked received. Django Admin at `/admin/`
continues to be available for backend administration.

The admin sidebar's **Widget** page (`/widget`) provides configurable donation
and collection-point statistics and charts. Choose which widgets to display;
the selection is saved in the current browser.

For a local full-stack demo, follow the Django setup in the backend README and
run `python manage.py createsuperuser` to create a staff login. In the frontend,
set `VITE_API_BASE_URL=http://localhost:8000/api`, then run:

```sh
npm install
npm run dev
```

Check the frontend before presenting the demo with:

```sh
npm run lint
npm run build
```

The backend workflow and permission tests can be run from its directory with:

```sh
DJANGO_DEBUG=true python manage.py test sharebite.tests
```

## 🔧 Project Structure
```
frontend/
│-- src/
│   │-- components/   # Reusable UI components
│   │-- helpers/      # Reusable functions
│   │-- layouts/      # Layouts
│   │-- providers/    # context providers 
│   │-- router/       # Routes setup
│   │-- schema/       # Zod Validation schemas
│   │-- themes/       # Material UI components
│   │-- types/        # Global types declaring
│   │-- pages/        # Page components (Dashboards, Auth, etc.)
│   │-- hooks/        # Custom React hooks
│   │-- context/      # Global state management
│   │-- services/     # API request functions
│   │-- utils/        # Helper functions
│-- public/           # Static assets
│-- .env              # Environment variables
│-- vite.config.ts    # Vite configuration
│-- tsconfig.json     # TypeScript configuration
```

## 📌 Available Pages
### 🔹 Donor Dashboard
- View & create donations
- Upload proof of donation
- Track donation status

### 🔹 Admin Dashboard
- Manage donations
- Approve or reject donations
- Manage users

### 🔹 Receiver Dashboard
- View available donations
- Reserve a donation
- Upload receipt after pickup

## 🔗 API Integration
- Uses Axios to fetch data from the Django backend.
- Authentication via JWT tokens stored in **localStorage**.
- Uses React Query (optional) for caching API responses.

## 🚀 Deployment
To build for production:
```sh
npm run build
```
For deployment, upload the `dist/` folder to your hosting service.

## 📄 License
This project is licensed under the MIT License.

## 📞 Contact
For support or contributions, contact [Your Name] at [emmanuelifedi0@gmail.com].
