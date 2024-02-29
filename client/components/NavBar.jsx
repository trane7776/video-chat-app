import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
const NavBar = () => {
  return (
    <nav className="m-auto bg-white border-gray-200  w-[60%] flex md:justify-between md:flex-row justify-center flex-col items-center">
      <Link className="flex items-center" href="/">
        <img src="./icon.svg" className="w-11 h-auto m-2" />
        <Typography variant="h6" className="">
          миглер и Компания
        </Typography>
      </Link>

      <ul className="flex gap-6 mr-3 justify-end">
        <li>
          <Link href="/about">
            <Typography variant="h6">О нас</Typography>
          </Link>
        </li>

        <li>
          <Link href="/contacts">
            <Typography variant="h6">Контакты</Typography>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
