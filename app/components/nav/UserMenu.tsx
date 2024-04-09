"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        >
          {currentUser?.image ? (
            <Image
              src={currentUser.image}
              alt={currentUser.name || ""}
              width={25}
              height={25}
              className="rounded-full"
            />
          ) : (
            <RxAvatar size={25} />
          )}
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                {currentUser.role === "ADMIN" ? (
                  <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>管理画面</MenuItem>
                  </Link>
                ) : (
                  <Link href="/orders">
                    <MenuItem onClick={toggleOpen}>ご注文内容</MenuItem>
                  </Link>
                )}
                <hr />
                {/* <Link href="/"> */}
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut({ redirect: false });
                    router.push("/");
                    router.refresh();
                    toast.success("ログアウトしました");
                  }}
                >
                  ログアウト
                </MenuItem>
                {/* </Link> */}
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>ログイン</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>ユーザー登録</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
