import { lazy, Suspense } from "react";

const DesignSystemPage = lazy(() => import("../features/design-system/DesignSystemPage"));

const DesignSystem = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Cargando...</div>
      </div>
    }
  >
    <DesignSystemPage />
  </Suspense>
);

export default DesignSystem;
