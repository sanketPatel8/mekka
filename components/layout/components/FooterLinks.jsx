import Link from "next/link";

const sections = [
  {
    title: "Company",
    links: [
      { id: 1, text: "About Us", href: "#" },
      { id: 2, text: "Tourz Reviews", href: "#" },
      { id: 3, text: "Contact Us", href: "#" },
      { id: 4, text: "Travel Guides", href: "#" },
      { id: 5, text: "Data Policy", href: "#" },
      { id: 6, text: "Cookie Policy", href: "#" },
      { id: 7, text: "Legal", href: "#" },
      { id: 8, text: "Sitemap", href: "#" },
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
