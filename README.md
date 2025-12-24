## 🍽️ DineHub – Food Ordering Platform (MERN Stack)

DineHub is a full-stack food ordering web application built using the MERN stack. It allows users to browse restaurants and food items, place orders, and manage their accounts through a modern and responsive interface.

---

## 🚀 Features

👤 User Features

- User authentication (Sign up / Sign in)
- Browse food items and restaurants
- Add items to cart
- Place food orders
- View order history
- Responsive UI (mobile & desktop)

🛠️ Admin Features

- Add, update, and delete food items
- Manage orders
- Manage users
- Dashboard overview

---

## 🧰 Tech Stack

Frontend

- React 19
- React Router
- Tailwind CSS
- TanStack React Query
- Fetch API

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based auth

Deployment

- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Nazim6269/Project02_DineHub_MERN.git
cd Project02_DineHub_MERN
```

## Install Dependencies

Backend

```bash
cd backend
yarn install
# or
npm install
```

Frontend

```bash
cd frontend
yarn install
# or
npm install
```

## ⚙️ Environment Variables

Backend

```bash
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>
ACCESS_KEY=your_access_key_here
FB_ID=your_facebook_app_id
FB_SECRET=your_facebook_app_secret
SECRET_KEY=your_jwt_secret_key
SMTP_USERNAME=your_email@example.com
SMTP_PASSWORD=your_email_app_password

```

Frontend

```bash
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_FB_ID=your_fb_id
```

## Run Development Server

Backend

```bash
yarn start
# or
npm start
```

Frontend

```bash
yarn dev
# or
npm dev
```

## Open your Browser

Visit: [http://localhost:5173](http://localhost:5173)

## Project Structure

```bash
.

backend/
├─ configs/
│  └─ db.js
├─ controllers/
│  └─ userController.js
├─ helpers/
│  ├─ cookies.js
│  ├─ createJWT.js
│  ├─ emailWithNodemailer.js
│  └─ responseHandler.js
├─ models/
│  └─ signupModel.js
├─ routes/
│  └─ userRouter.js
├─ validators/
│  ├─ condition.js
│  └─ validation.js
├─ .env
├─ .gitignore
├─ app.js
├─ index.js
├─ package-lock.json
├─ package.json
├─ secret.js
├─ vercel.json
└─ yarn.lock

frontend/
├─ public/
│  ├─ h11.png
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ Components/
│  │  ├─ CardDetails/
│  │  │  └─ CardDetails.jsx
│  │  ├─ Cards/
│  │  │  └─ Cards.jsx
│  │  ├─ Categories/
│  │  │  └─ Categories.jsx
│  │  ├─ Category/
│  │  │  └─ Category.jsx
│  │  ├─ Dropdown/
│  │  │  └─ Dropdown.jsx
│  │  ├─ Footer/
│  │  │  └─ Footer.jsx
│  │  ├─ ForgetPassword/
│  │  │  └─ ForgetPassword.jsx
│  │  ├─ Hero/
│  │  │  └─ HeroSection.jsx
│  │  ├─ Login/
│  │  │  └─ LoginForm.jsx
│  │  ├─ Menuitems/
│  │  │  └─ Menuitems.jsx
│  │  ├─ Modal/
│  │  │  ├─ Modal.jsx
│  │  │  └─ modal.module.css
│  │  ├─ Nav2/
│  │  │  └─ Nav2.jsx
│  │  ├─ Navbar/
│  │  │  └─ Navbar.jsx
│  │  ├─ Private/
│  │  │  └─ PrivateRoute.jsx
│  │  ├─ Question/
│  │  │  └─ Question.jsx
│  │  ├─ RangeFilter/
│  │  │  ├─ rangeFilter.css
│  │  │  └─ RangeFilter.jsx
│  │  ├─ RecentView/
│  │  │  └─ RecentView.jsx
│  │  ├─ RelatedItem/
│  │  │  └─ RelatedItem.jsx
│  │  ├─ ResetPassword/
│  │  │  └─ ResetPassword.jsx
│  │  ├─ Review/
│  │  │  └─ Review.jsx
│  │  ├─ SelectFilter/
│  │  │  └─ SelectFilter.jsx
│  │  ├─ signup/
│  │  │  ├─ signup.module.css
│  │  │  └─ SignupForm.jsx
│  │  └─ SingleCategory/
│  │     └─ SingleCategory.jsx
│  ├─ helpers/
│  │  ├─ deleteAccessToken.jsx
│  │  ├─ fetchData.jsx
│  │  ├─ getAccessToken.jsx
│  │  ├─ logout.jsx
│  │  ├─ setAccessToken.jsx
│  │  └─ setLocalStorage.jsx
│  ├─ redux/
│  │  ├─ actions/
│  │  │  ├─ actionsCreator.jsx
│  │  │  └─ actionsTypes.jsx
│  │  ├─ reducers/
│  │  │  ├─ cardReducer.jsx
│  │  │  └─ combineReducer.jsx
│  │  └─ store.jsx
│  ├─ screens/
│  │  ├─ Cart.jsx
│  │  ├─ Contact.jsx
│  │  ├─ Home.jsx
│  │  └─ NotFound.jsx
│  ├─ utils/
│  │  └─ menuItems.jsx
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .env
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ vercel.json
├─ vite.config.js
└─ yarn.lock

```

## 🧪 Future Improvements

- Online payment integration
- Real-time order tracking
- Restaurant ratings & reviews
- Push notifications
- Multi-vendor support

## 💻 Deployment

Deployed on Vercel for live demo.

🔗 Live Demo: [https://project02-dine-hub-mern-aqcz.vercel.app/](https://project02-dine-hub-mern-aqcz.vercel.app/)

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Nazim Uddin  
Front-End Developer | React & Next.js Enthusiast

- 🌐 [Portfolio](https://portfolio-nextjs-one-tau.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/nazim-uddin-23a93a216/)
- 🐙 [GitHub](https://github.com/Nazim6269)
