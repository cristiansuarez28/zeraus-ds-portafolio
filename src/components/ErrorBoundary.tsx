/**
 * ErrorBoundary
 * Captura errores de render en cualquier componente hijo y muestra
 * una UI de fallback en lugar de una pantalla blanca.
 */

import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="flex min-h-screen items-center justify-center bg-background p-8"
        >
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Algo salió mal
            </h1>
            <p className="text-muted-foreground mb-6">
              Ocurrió un error inesperado. Por favor recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 h-10 rounded-full bg-foreground text-background
                         text-sm font-semibold hover:bg-foreground/80 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
