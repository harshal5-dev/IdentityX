import AppHeader from "./AppHeader";

const AppLayout = ({
  children,
  title = "IdentityX",
  subtitle = "Dashboard",
  showBackButton = false,
  backPath = "/dashboard",
  maxWidth = "7xl",
}) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AppHeader
        title={title}
        subtitle={subtitle}
        showBackButton={showBackButton}
        backPath={backPath}
      />

      <main className={`max-w-${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-6`}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
