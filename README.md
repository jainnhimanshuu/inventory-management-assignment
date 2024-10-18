
# Inventory Management System

## Project Overview

This project is an Inventory Management System built using React and TypeScript. It allows users to view the products. The application features an admin role that provides additional capabilities like editing, deleting, and disabling products for managing the inventory.

## Project Structure

The project is organized into several directories and files, each serving a specific purpose:

### Directory Breakdown

- **/components**: Contains all the reusable components used throughout the application. Each component is responsible for a specific part of the UI.

- `Table.tsx`: Displays the inventory items in a tabular format.

- `Widget.tsx`: Represents a statistical widget for displaying inventory metrics.

- `Switch.tsx`: A toggle switch for changing user roles (admin/user).

- `EditModal.tsx`: A modal for editing inventory item details.

- **/lib**: Contains utility functions that perform various calculations and data manipulations related to inventory.

- `utils.ts`: Functions for calculating total products, out-of-stock items, total value, and parsing amounts.

- **/store**: Contains the Zustand store for managing global state.

- `useInventoryStore.ts`: Defines the state structure and actions for managing inventory data and user roles.

- **/types**: Contains TypeScript interfaces for type safety.

- `productType.ts`: Defines the `IInventory` interface for inventory items.

- **App.tsx**: The main application component that fetches inventory data, manages state, and renders the UI.

- **index.tsx**: The entry point of the application where the React app is rendered into the DOM.

- **index.css**: Contains global styles using Tailwind CSS for styling the application.

## Approaches

### State Management

The application uses Zustand for state management, which provides a simple and efficient way to manage global state without the complexity of Redux. The state includes:

- `isAdmin`: A boolean indicating whether the user has admin privileges.

- `tableData`: An array of inventory items.

### Component-Based Architecture

The application follows a component-based architecture, where each UI element is encapsulated in its own component. This promotes reusability and maintainability. Components are designed to be as independent as possible, allowing for easier testing and updates.

### TypeScript

TypeScript is used throughout the project to provide type safety and improve code quality. Interfaces are defined for inventory items and component props, ensuring that the data structures are consistent and reducing runtime errors.

### Responsive Design

The application is designed to be responsive, utilizing Tailwind CSS for styling. This allows the UI to adapt to different screen sizes, providing a better user experience on both desktop and mobile devices.

### Fetching Data

The application fetches inventory data from an external API using the `react-fetch-hook` library. This allows for easy data retrieval and management within the application.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

```
git clone <repository-url>

```

2. Navigate to the project directory:

```
cd inventory-management-system

```

3. Install the dependencies:

```
npm install

```

4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` to view the application.
