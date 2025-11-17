# Event Creation Backend

## Overview

This backend provides the server side logic for an event creation and management application. It includes handling events, suppliers, reviews, users, and local image uploads. The project uses Firebase Admin for authentication to protect private routes and ensure that only authorized users can access or modify data.

## Routes

The backend includes routes for events, suppliers, reviews, event images, and users. Events can be created, updated, and deleted. Users can assign suppliers to events, upload images, and view their personal “My Events” list. Suppliers can be retrieved and managed, and users can submit reviews for events or suppliers.

## Authentication

Firebase Admin SDK is used to verify user tokens. Every protected route validates a bearer token provided by the frontend and extracts the authenticated user’s UID and email.

## Project Structure

The project structure includes modules for events, suppliers, users, reviews, and event pictures, as well as authentication middleware and Firebase configuration. Environment variables are used to configure the server.

## API Endpoints

API endpoints support creating and retrieving events, managing suppliers, handling reviews, and managing user related data.
