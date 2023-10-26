import Link from 'next/link';
import NavLink from './NavLink';
import NavBtn from './NavBtn';

export type NavLink = {
    name: string;
    route: string;
}

const Nav = () => {
    const links: NavLink[] = [
        {
            name: 'Login',
            route: '/login'
        },
        {
            name: 'Register',
            route: '/register'
        },
        {
            name: 'Profil',
            route: '/profile'
        }
    ]

    return (
        <nav>
            <div className='container' id='nav-container'>
                <div id='logo-wrapp'>
                    <Link href={'/'}>
                        <p>Logo</p>
                    </Link>
                </div>
                <div id="links-wrapp">
                    <ul>
                        {
                            links.map(link => <NavLink key={link.route} link={link} />)
                        }
                    </ul>
                </div>
                <NavBtn />
            </div>
        </nav>
  )
}

export default Nav