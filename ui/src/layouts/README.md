# Layouts

Reusable layout components for the IdentityX application.

## Components

### AppHeader

A reusable header component with navigation, logo, user profile, and logout functionality.

**Props:**
- `title` (string, default: "IdentityX") - Main title displayed in the header
- `subtitle` (string, default: "Dashboard") - Subtitle text below the title
- `showBackButton` (boolean, default: false) - Show/hide back button
- `backPath` (string, default: "/dashboard") - Navigation path for back button

**Example:**
```jsx
import { AppHeader } from "@/layouts";

<AppHeader 
  title="Profile" 
  subtitle="Manage your account"
  showBackButton={true}
  backPath="/dashboard"
/>
```

### AppLayout

A complete layout wrapper that includes the header, main content area, and automatic token refresh.

**Props:**
- `children` (ReactNode, required) - Content to render in the main area
- `title` (string, default: "IdentityX") - Header title
- `subtitle` (string, default: "Dashboard") - Header subtitle
- `showBackButton` (boolean, default: false) - Show/hide back button in header
- `backPath` (string, default: "/dashboard") - Navigation path for back button
- `maxWidth` (string, default: "7xl") - Maximum width class for content container

**Example:**
```jsx
import { AppLayout } from "@/layouts";

const MyPage = () => {
  return (
    <AppLayout 
      title="My Page" 
      subtitle="Page description"
      showBackButton={true}
    >
      <div>Your content here</div>
    </AppLayout>
  );
};
```

## Features

- **Consistent Navigation**: Same header across all protected pages
- **Automatic Token Refresh**: Built-in token refresh every 14 minutes
- **User Profile Display**: Shows user avatar and name with link to profile
- **Responsive Design**: Works on all screen sizes
- **Animations**: Smooth transitions with Framer Motion
- **Logout Functionality**: Integrated logout button

## Usage in Pages

### Dashboard Example
```jsx
import { AppLayout } from "@/layouts";

const Dashboard = () => {
  return (
    <AppLayout title="IdentityX" subtitle="Dashboard">
      {/* Your dashboard content */}
    </AppLayout>
  );
};
```

### UserInfo Example
```jsx
import { AppLayout } from "@/layouts";

const UserInfo = () => {
  return (
    <AppLayout 
      title="Profile" 
      subtitle="Manage your account" 
      showBackButton={true}
      backPath="/dashboard"
    >
      {/* Your profile content */}
    </AppLayout>
  );
};
```

## Styling

The layout components use:
- Tailwind CSS for styling
- Custom CSS variables for theming (--brand-gradient, --brand-primary, etc.)
- Backdrop blur for glassmorphism effect
- Smooth transitions and animations with Framer Motion

## Dependencies

- React Router DOM (navigation)
- Framer Motion (animations)
- Redux Toolkit (state management)
- lucide-react (icons)
- @/components/ui (shadcn/ui components)
