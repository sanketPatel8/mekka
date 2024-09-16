import Link from "next/link";

const sections = [
  {
    title: "Company",
    links: [
      { id: 1, text: "Contact", href: "/contact" },
      { id: 2, text: "Login", href: "/login" },
      { id: 3, text: "Sign Up", href: "/register" },
      { id: 4, text: "Partners", href: "/partner" },
      { id: 4, text: "Partners Login", href: "/partner-login" },
      { id: 5, text: "My Account", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { id: 9, text: "Terms of Use", href: "/Terms-of-Use" },
      { id: 10, text: "Imprint", href: "/Impressum" },
      { id: 11, text: "Data Protection", href: "/Datenschutz" },
      { id: 12, text: "Cookie Policy", href: "/cookie-richtline" },
    ],
  },
];

export default function FooterLinks() {
  return (
    <>
      {sections.map((elm, i) => (
        <div key={i} className="col-lg-auto col-6">
          <h4 className="text-20 fw-500">{elm.title}</h4>

          <div className="y-gap-10 mt-20">
            {elm.links.map((elm2, i2) => (
              <Link key={i2} className="d-block fw-500" href={elm2.href}>
                {elm2.text}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
