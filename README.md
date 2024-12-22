# DVD Rental System

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
├── dvd-rental-system/               # React frontend
├── dvdrentalsystem/               # Spring Boot backend
└── README.md             # Project documentation
```

---

## 🤝 Contributors
- **Noam Radeanu** [GitHub Profile](https://github.com/noamradiano)
- **Shon Salomonovitch** [GitHub Profile](https://github.com/shonsalomonovitch)
- **Tal Danon** [GitHub Profile](https://github.com/TalDanon98) 

---

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

