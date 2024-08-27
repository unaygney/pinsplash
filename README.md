# Pinsplash

🚀 **Pinsplash: A Modern Web Application for Exploring Images** 🌍

I'm excited to share my latest project, **Pinsplash**—a responsive web application that allows users to explore images using the Unsplash API! 🖼️

## Project Overview

Pinsplash is a platform designed to elevate the user experience by enabling the discovery of a vast image gallery, conducting keyword searches, and downloading high-resolution images. The application features a dynamically adjusted masonry layout, infinite scrolling, and detailed photo pages, all aimed at providing a seamless and engaging experience.

## Key Features

### 1. Image Gallery

- **Masonry Layout:** Implemented a modern and aesthetic masonry layout that dynamically adjusts the number of columns based on screen size.
- **Hover Effect:** Displays the uploader's avatar and image name when hovering over an image.
- **Infinite Scroll:** Additional images load as users scroll down or click the "Load More" button.

### 2. Search Functionality

- **Search Bar:** Users can search for images using keywords, with results displayed dynamically.
- **Empty State:** If no search results are found, a custom empty state message is displayed as per the design.

### 3. Photo Details Page

- **Navigation:** Clicking on images leads to a details page where users can view information such as the number of views, upload date, category tags, and download count.
- **Download Options:** Users can download images in various resolutions—Small, Medium, and Large—depending on the original image dimensions.
- **Related Images:** Users can view related images on the details page for a more comprehensive browsing experience.

### 4. Category Detail Page

- **Category Selection:** Users can navigate to a category detail page by clicking on category chips on the homepage or tags on the photo details page.
- **Category-Specific Gallery:** Images relevant to the selected category are displayed in a masonry format similar to the main gallery page.

### 5. API Integration

- **Unsplash API:** Integrated the Unsplash API to fetch images, handle search queries, and manage image downloads.
- **Data Fetching Issues:** Implemented custom error messages to handle issues related to data fetching.

## Technologies Used

- **Next.js**
- **Tailwind CSS**
- **Unsplash API**
- **React Query**
- **TypeScript**

## Project Date

- **Completed on:** 2024-08-28

## Demo

[Demo](https://pinsplash-tau.vercel.app/)
