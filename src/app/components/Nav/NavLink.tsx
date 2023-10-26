'use client';

import Link from 'next/link'
import React from 'react'
import { NavLink } from './Nav'
import { usePathname } from 'next/navigation';

type NavBarLinkPropTypes = {
    link: NavLink;
}

const NavBarLink: React.FunctionComponent<NavBarLinkPropTypes> = ({ link }) => {
    const pathname = usePathname()

    return (
    <li>
        <Link 
            href={link.route} 
            key={link.route}
            style={pathname === link.route ? { color: '#fff' } : {}}
        >
        {link.name}
        </Link> 
    </li>
  )
}

export default NavBarLink