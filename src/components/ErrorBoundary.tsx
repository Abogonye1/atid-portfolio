import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Structured logging for diagnostics
    console.error("[ErrorBoundary] Caught error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      info: errorInfo.componentStack,
    });
  }

  handleReload = () => {
    // Force reload to recover from fatal UI errors
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
          <div className="max-w-md rounded-lg border border-border p-6 shadow-lg">
            <h1 className="text-lg font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              An unexpected error occurred. Details are logged to the console.
            </p>
            <button
              onClick={this.handleReload}
              className="mt-4 inline-flex items-center justify-center rounded-md border border-border bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;