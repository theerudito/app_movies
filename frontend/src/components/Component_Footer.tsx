import "../styles/Styles_Footer.css";

export const Component_Footer = () => {
  const año = new Date();
  return (
    <div className="footer">
      <span>Jorge Loor</span>
      <span>BETWEEN BYTE SOFTWARE {año.getFullYear()} </span>
    </div>
  );
};
