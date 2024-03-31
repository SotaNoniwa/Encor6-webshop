import Link from "next/link";
import Container from "../Container";
import { dancing_script } from "@/app/fonts";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { FaSearch } from "react-icons/fa";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-emerald-50 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href={"/"}
              className={`${dancing_script.className} font-bold text-2xl`}
            >
              encor6
            </Link>
            <div>
              <FaSearch className="cursor-pointer size-[26px]" />
              {/* TODO: implement search box and its functionality */}
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
