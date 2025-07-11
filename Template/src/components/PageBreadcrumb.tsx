import { ReactNode } from "react";
import { Helmet } from "react-helmet";

interface PageTitleProps {
  breadCrumbItems?: string[];
  title: string;
  name?: string;
  children?: ReactNode;
}

const PageBreadcrumb = ({ breadCrumbItems, title, name, children }: PageTitleProps) => {
  return (
    <>
      <Helmet>
        <title>{title} | Konrix - Responsive Tailwind Admin Dashboard</title>
      </Helmet>
      {name && <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <h4 className="text-slate-900 dark:text-slate-200 text-lg font-medium">{name}</h4>
          {children}
        </div>
        <div className="md:flex hidden items-center gap-2.5 text-sm font-semibold">
          {(breadCrumbItems || []).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {(idx !== 0) && <i className="mgc_right_line text-lg flex-shrink-0 text-slate-400 rtl:rotate-180"></i>}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-400">{item}</span>
            </div>
          ))}
        </div>
      </div>}
    </>
  )
}

export default PageBreadcrumb;
