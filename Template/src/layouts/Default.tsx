import { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";

// redux
import { RootState } from "../redux/store";

// utils
import { changeHTMLAttribute } from "../utils/layout";

const loading = () => <div />;

interface DefaultLayoutProps {
  layout: {
    layoutType: string;
    layoutWidth: string;
    sideBarTheme: string;
    sideBarType: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { layoutTheme } = useSelector((state: RootState) => ({
    layoutTheme: state.Layout.layoutTheme,
  }));

  useEffect(() => {
    changeHTMLAttribute("data-mode", layoutTheme);
  }, [layoutTheme]);

  // get the child view which we would like to render
  const children = props["children"] || null;

  return (
    <>
      <Suspense fallback={loading()}>{children}</Suspense>
    </>
  );
};

export default DefaultLayout;
