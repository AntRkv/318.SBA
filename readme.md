# Car Management API

This project is a simple RESTful API for managing cars. It allows you to create, read, update, and delete cars using HTTP methods. This project is built using Node.js, Express, and basic file-based data storage.

## Features

- **Cars**: Add, view, edit, and delete cars in the system.

## Project Structure

The project consists of the following main components:

- **Cars**: Represents the cars available in the system.

### Data Categories

1. **Cars**: Each car has an `id`, `make`, `model`, and `year`.

## Endpoints

### Cars API

- `GET /api/cars`: Get a list of all cars.
- `POST /api/cars`: Add a new car.
- `GET /api/cars/:id`: Get details of a specific car.
- `PATCH /api/cars/:id`: Update a car's details.
- `DELETE /api/cars/:id`: Delete a car.

## Installation

To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone <repository-url>
