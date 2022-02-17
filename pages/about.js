import DefaultLayout from "@/components/layouts/Default";
import { CssBaseline } from "@mui/material";
import useCurruntUser from "@/lib/hooks/useCurrentUser";
import SessionLayout from "@/components/layouts/Session";

export default function About() {
  const { currenUser } = useCurruntUser();

  return (
    <>
      {currenUser ? (
        <SessionLayout>
          about page
          <hr />
          Atit Khaoeam
        </SessionLayout>
      ) : (
        <DefaultLayout>
          about page
          <hr />
          Atit Khaoeam
        </DefaultLayout>
      )}
    </>
  );
}
