import { useRouter } from "next/router";

function ActiveLink({ children, href }) {
  const router = useRouter();

  let className = "";
  if (router.asPath === href)
    className = `${className} underline underline-offset-4`;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default ActiveLink;
