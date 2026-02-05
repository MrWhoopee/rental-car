# RentalCar - Car Rental Service

RentalCar is a modern web application designed for a car rental company. Users can browse a wide catalog of vehicles, filter them by specific criteria, view detailed information about each car, and book them through a dedicated form.

## 🚀 Key Features

- **Dynamic Catalog**: Browse a variety of cars with infinite scroll ("Load More").
- **Advanced Filtering**: Filter cars by brand, price per hour, and mileage directly on the backend.
- **Favorites System**: Add cars to your personal favorites list (persists after page refresh).
- **Detailed Car Pages**: View full specifications, accessories, and rental conditions.
- **Booking Form**: Integrated rental form with real-time validation and toast notifications.
- **Responsive Design**: Premium UI optimized for a seamless experience.
- **Form Validation**: Strict client-side validation using Formik and Yup.
- **Performance Optimized**: Uses Next.js Image optimization (`priority` loading for LCP images) and efficient state management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with Persistence Middleware
- **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Form Handling**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **Styling**: CSS Modules
- **Components**: [react-select](https://react-select.com/), [react-datepicker](https://react-datepicker.com/), [react-number-format](https://github.com/s-yadav/react-number-format)
- **Notifications**: [react-hot-toast](https://react-hot-toast.com/)

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/rental-car.git
   cd rental-car
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add:

   ```env
   NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global/api
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (CarCard, SearchForm, Loader, etc.).
- `store/`: Zustand store for global state management.
- `lib/`: API functions, Axios instance, and utility helpers.
- `type/`: TypeScript interfaces and types.
- `public/`: Static assets like SVG sprites.

## 👤 Author

**[Your Name/Username]**

- [GitHub](https://github.com/your-username)
- [LinkedIn](https://www.linkedin.com/in/your-profile)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
