# DVD Rental System 🎬
<img width="90%" alt="Logo" src="https://github.com/user-attachments/assets/d3552cdf-d208-45c9-85e5-ae7cd9be62a2" />

## 📖 Description
This project is a **DVD Rental System**, reminiscent of classic rental services like Blockbuster. The system allows users to browse available DVDs, manage rentals, and handle returns. It includes both a user-friendly client-side application and a robust backend server to ensure seamless functionality.

The project was developed as a **final study project** for university, showcasing full-stack development skills with modern technologies.

---

## 🚀 Features
- **User Management**: Sign-up, log-in, and manage user and admin profiles.
- **DVD Catalog**: View and search a catalog of available DVDs.
- **Rental System**: Rent DVDs with detailed tracking and return functionality.
- **Admin Panel**: Manage inventory, track active rentals, and user activities.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## 🛠️ Technologies Used
### Client-Side
- **React**: Frontend framework for building the user interface.
- **CSS**: Styled the application for a modern and user-friendly design.

### Server-Side
- **Java with Spring Boot**: Backend framework for RESTful APIs.
- **JPA (Java Persistence API)**: For object-relational mapping (ORM).
- **PostgreSQL**: Relational database for storing DVD and rental data.

### Additional Tools
- **Maven**: Build automation tool.
- **Postman**: For testing APIs during development.
- **Git & GitHub**: Version control and repository hosting.

---
## 📸 Screenshots
### 📎 Welcome Screen
<img width="90%" alt="welcome" src="https://github.com/user-attachments/assets/3a5cabe2-30d7-44a6-8f9d-f87b94bd3929" />

### 🔐 Sign in & Login 
<img width="90%" alt="sign in" src="https://github.com/user-attachments/assets/e555f0d4-3e56-435f-9e03-08a18e8809a6" />

<img width="90%" alt="Login" src="https://github.com/user-attachments/assets/77f94b12-e07c-4390-96e2-916ebda4dac8" />

## 👤 Admin Screens
### 🏠 Home page
<img width="90%" alt="admin home page" src="https://github.com/user-attachments/assets/c04f57a6-b536-471b-b2b1-bfd95ee3e0a2" />

### 👨🏼‍💻 Users View 
<img width="90%" alt="Users view" src="https://github.com/user-attachments/assets/65a8ad82-9896-4b9c-a20a-e996037d535c" />


### 💳 Order View
<img width="90%" alt="דף הזמנות מנהל" src="https://github.com/user-attachments/assets/da0320bc-2ab3-4306-936a-fcf924ef8a7d" />

### ➕ 👨🏼‍💻Add movie
<img width="90%" alt="add movie" src="https://github.com/user-attachments/assets/bf9e1d05-6c86-4388-a93a-501fd60467bc" />

### ✏️ Edit Movie
<img width="90%" alt="Edit movie 1" src="https://github.com/user-attachments/assets/52b544be-e5a5-4df0-862d-96de76241950" />
<img width="90%" alt="Edit movie 2" src="https://github.com/user-attachments/assets/e3d31f47-3450-4dd6-8e33-3b9598432c25" />

## 👨🏼‍💻 User Screens
### 🏡 User Home Page
<img width="90%" alt="user home page" src="https://github.com/user-attachments/assets/be8681b8-385e-4d10-9ee1-f734a73d93e7" />

### 🎞️ Movie Detail
<img width="90%" alt="movie detail" src="https://github.com/user-attachments/assets/e2918dca-c1d4-4f10-aa08-2955a3461bd4" />

### 📄 Review pop-up
<img width="90%" alt="ביקורת משתמש" src="https://github.com/user-attachments/assets/2380b709-2aa6-4d0a-a60b-8fb34c1498dc" />

### 📜 Rental History
<img width="90%" alt="היסטוריה משתמש" src="https://github.com/user-attachments/assets/99af743f-b07e-4913-b56c-574c5ea53f22" />

---
## 📦 Installation and Setup
### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** and **Npm** for the client.
- **Java 17+** and **Maven** for the server.
- **PostgreSQL** database.

### Steps
#### 1. Clone the Repository
```bash
git clone https://github.com/noamradiano/dvd-rental-system.git
cd dvd-rental-system
```

#### 2. Set Up the Backend
1. Navigate to the `dvdrentalsystem` directory:
   ```bash
   cd dvdrentalsystem
   ```
2. Configure the `application.properties` file for your PostgreSQL setup.
3. Build and run the server:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

#### 3. Set Up the Frontend
1. Navigate to the `dvd-rental-system` directory:
   ```bash
   cd ../dvd-rental-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

#### 4. Access the Application
- Client: `http://localhost:3000`
- API: `http://localhost:8080`

---

## 📂 Folder Structure
```
.
├── dvd-rental-system/          # React frontend
├── dvdrentalsystem/            # Spring Boot backend
└── README.md                   # Project documentation
```

---

## 🤝 Contributors ©️
- **Noam Radeanu** [GitHub Profile](https://github.com/noamradiano)
- **Shon Salomonovitch** [GitHub Profile](https://github.com/shonsalomonovitch)
- **Tal Danon** [GitHub Profile](https://github.com/TalDanon98) 

---

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.
