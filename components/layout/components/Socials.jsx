const socialMediaLinks = [
  { id: 1, class: "icon-facebook", href: "https://www.facebook.com/people/Mekkabooking-Hadsch-Umrah/pfbid026BacPVthDuQQvtuApHodjq3ZmrGZumUvwj27L6rKHnfctnCCWsymbUTzYYn9jbL1l/" },
  // { id: 2, class: "icon-twitter", href: "#" },
  { id: 3, class: "icon-instagram", href: "https://www.instagram.com/mekkabooking_official/" },
  // { id: 4, class: "icon-linkedin", href: "#" },
];

export default function Socials() {
  return (
    <>
      {socialMediaLinks.map((elm, i) => (
        <a key={i} href={elm.href} className={elm.class}></a>
      ))}
    </>
  );
}
