import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/Button";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <SEOHead
        title="404 — Page Not Found"
        description="The agricultural resource, report, or screen you requested does not exist or has been relocated."
        canonicalPath="/404"
      />
      <div className="w-16 h-16 rounded-full bg-[#E9A23B]/15 text-[#E9A23B] flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-[#0F2E24] mb-2 font-display">
        404 — Page Not Found
      </h1>
      <p className="text-[#787266] max-w-md mb-6 text-sm leading-relaxed">
        The agricultural resource, data table, or screen you requested does not exist or has been relocated within the Farmculture platform.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" icon={<Home className="w-4 h-4" />}>
            Return to Dashboard
          </Button>
        </Link>
        <Link to="/services">
          <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
            View Service Portfolio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
