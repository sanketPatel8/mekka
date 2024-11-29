import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const socialMediaLinks = [
  {
    id: 1,
    class: "",
    href: "https://www.facebook.com/mekkabooking.official",
    Icon: FaFacebookF, // Use the actual icon component
  },
  {
    id: 3,
    class: "",
    href: "https://www.instagram.com/mekkabooking_official/",
    Icon: FaInstagram, // Use the actual icon component
  },
  {
    id: 4,
    class: "icon-tiktok",
    href: "https://www.tiktok.com/@mekkabooking",
    Icon: FaTiktok, // Use the actual icon component
  },
];

export default function Socials() {
  return (
    <>
      {socialMediaLinks.map((elm, i) => (
        <a key={i} href={elm.href} className={elm.class} target="_blank" rel="noopener noreferrer">
          <elm.Icon /> {/* Render the icon dynamically */}
        </a>
      ))}
    </>
  );
}
