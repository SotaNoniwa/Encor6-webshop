import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { AiFillInstagram } from "react-icons/ai";
import { FaThreads } from "react-icons/fa6";
import { categories } from "@/utils/Categories";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">🐾 カテゴリー</h3>
            {categories.map((item) => {
              if (item.label === "All") {
                return (
                  <Link key={item.label} href="/">
                    {item.label}
                  </Link>
                );
              }
              return (
                <Link key={item.label} href={`/?category=${item.label}`}>
                  {item.label}
                </Link>
              );
            })}
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">🐾 カスタマーサービス</h3>
            <Link href="#">ご利用ガイド</Link>
            <Link href="#">お支払いについて</Link>
            <Link href="#">送料、お届けについて</Link>
            <Link href="#">お問い合わせ</Link>
            <Link href="#">FAQs / よくあるお問い合わせ</Link>
            <Link href="#">特定商取引法表示</Link>
            <Link href="#">個人情報の取扱</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">🐾 encor6について</h3>
            <p className="mb-2">
              主にリネンやコットンの生地での製作
              <br />
              kyoto Japan 📍
              <br />
              <Link href="/about" className="underline">
                もっと詳しく...
              </Link>
            </p>
            <p>&copy; {new Date().getFullYear()} Encor6 All rights reserved.</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">🐾 Follow</h3>
            <div className="flex gap-2">
              <Link href="https://www.instagram.com/encor6/" target="_blank">
                <AiFillInstagram size={30} />
              </Link>
              <Link href="https://www.threads.net/@encor6" target="_blank">
                <FaThreads size={30} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
