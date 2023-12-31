import { ReactNode, MouseEvent } from "react";
import Image from "next/image";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  AuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebaseAuth";

interface LoginPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export default function Login({ isOpen, onClose }: LoginPageModalProps) {
  if (!isOpen) return null;

  const signInWithAuthProvider = (provider: AuthProvider) => {
    signInWithRedirect(auth, provider);
  };

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60"
      onClick={handleOutsideClick}
    >
      <div className="bg-offWhite flex items-center w-[400px] flex-col gap-y-3 px-6 py-10 rounded-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          X
        </button>
        {/* Logo */}
        <Image src="/sky-logo.svg" width={80} height={80} alt="Sky logo" />

        {/* Heading */}
        <h1 className="text-3xl font-bold">Get the full experience</h1>
        <p className="text-gray-900">
          You will need to sign in to access additional features such as booking
          your flights.
        </p>

        {/* Sign in buttons */}
        <div className="flex flex-col gap-y-7 font-bold">
          <button
            onClick={() => signInWithAuthProvider(facebookProvider)}
            className="relative bg-[#1877F2] text-offWhite rounded-full w-72 py-3"
          >
            <Image
              src="/fb-logo.svg"
              className="absolute top-[13px] left-8"
              width={18}
              height={18}
              alt="Apple logo"
            />
            <span>Continue with Facebook</span>{" "}
          </button>
          <button
            onClick={() => signInWithAuthProvider(googleProvider)}
            className="relative bg-[#DB4437F4] text-offWhite rounded-full w-72 py-3"
          >
            <Image
              src="/google-logo.svg"
              className="absolute left-8 top-[16px]"
              width={60}
              height={60}
              alt="Apple logo"
            />
            <span>Continue with Google</span>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
