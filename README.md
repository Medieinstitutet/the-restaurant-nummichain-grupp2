# <img src = "https://i.imgur.com/nZOwpXA.png" width = 250px>

## 👋 Overview
PixelBite is a React-based web application for a metaverse restaurant. It offers an immersive experience to showcase the restaurant's concept, menu, and contact details, while also providing a convenient booking system for users. The application features a well-thought-out design, intuitive navigation, and efficient booking functionality.

## 💻 Tech Stack
PixelBite is built using the following technologies:

- React
- Vite
- Ethers.js
- JavaScript
- HTML5
- SASS
- Ganache (for testing purposes)
- Github Issues (for project management)

## 🌟 Features
- **Start Page:** Introduces the restaurant's concept, ambiance, and highlights.
- **Booking Page:** Allows users to search for available tables based on date and number of guests. Users can select a preferred time slot and proceed to make a booking by providing personal details.
- **Contact Page:** Displays contact information for the restaurant, including address, phone number, email and a contact form.
- **Admin Mode:** Enables staff to manage reservations through a simple blockchain powered CRUD interface, allowing for modifications, additions, and deletions.

## ⚠️ Requirements
To run PixelBite locally, ensure you have the following installed:

- Node.js (v20.10.0 or newer)
- npm (Node Package Manager)
- Git
- Truffle
- Ganache
- Ports 4173 & 5173 must be available (used by Vite)

## 🚀 Installation (for testing purposes)
1. Clone the repository:
```bash
   git clone https://github.com/Medieinstitutet/pixelbite.git
```
2. Navigate to the project directory:
```bash
   cd pixelbite
```
3. Start Ganache, create a workspace, and configure MetaMask to utilize the Ganache network and account.

4. Navigate to the `eth-restaurant` directory:
```bash
   cd eth-restaurant
```
5. Install `eth-restaurant` dependencies:
```bash
   npm install
```

6. Use Truffle to deploy the contract and make a note of the contract address:
```bash
   truffle migrate --reset
```

7. Navigate to the `therestaurant` directory:
```bash
   cd therestaurant
```

8. Replace the `contractAddress` value in `src/config.js` with the address you received from Truffle.

9. Install `therestaurant` dependencies:
```bash
   npm install
```

10. Start the development server:
```bash
   npm run dev
```
Open your browser and navigate to http://localhost:5173/ to view the application.

## ⚖️ License
This project is licensed under the MIT License. Feel free to use and modify it according to your needs.