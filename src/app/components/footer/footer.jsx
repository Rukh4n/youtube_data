import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark-900 my-10 text-white py-8"> {/* Warna background biru kehitaman */}
      <div className="text-center">
        <p>Created by Nur Rukhan Saputra</p>
      </div>
      <div className="mt-4 text-center">
        <p>Follow Me on Social Media</p>
        <ul className="list-none">
          <li className="mt-2">
            <Link href="https://www.instagram.com/nur_rukhan/?locale=zh_tw&hl=ar">
              <p>@nur_rukhan</p>
            </Link>
            <p>nurrukhans@gmail.com</p>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
