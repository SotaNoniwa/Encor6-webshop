import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
    return ( 
        <footer className="bg-slate-800 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Categories</h3>
                        <Link href="#">ワンピース</Link>
                        <Link href="#">割烹着</Link>
                        <Link href="#">サンプル</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Customer Service</h3>
                        <Link href="#">ご利用ガイド</Link>
                        <Link href="#">お支払いについて</Link>
                        <Link href="#">送料、お届けについて</Link>
                        <Link href="#">お問い合わせ</Link>
                        <Link href="#">FAQs / よくあるお問い合わせ</Link>
                        <Link href="#">特定商取引法表示</Link>
                        <Link href="#">個人情報の取扱</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">About</h3>
                        <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                          anim id est laborum.<Link href="#"> もっと詳しく...</Link></p>
                          <p>&copy; {new Date().getFullYear()} Encor6 All rights reserved.</p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Follow</h3>
                        <div className="flex gap-2">
                            <Link href="#">
                                <AiFillInstagram size={30} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
     );
}
 
export default Footer;