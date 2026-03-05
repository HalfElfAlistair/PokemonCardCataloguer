import { Link } from '@tanstack/react-router';
import { HomeIcon } from '../assets/svg/HomeIcon';
import { GalleryIcon } from '../assets/svg/GalleryIcon';
import { AccountIcon } from '../assets/svg/AccountIcon';
import { useAuth } from '../state/auth-context';

import { useLocation } from '@tanstack/react-router';

export const Nav = () => {
    const { user } = useAuth();
    const assignLabelText = (str: string) => {
        return `Link to ${str} page`;
    }
    const location = useLocation();
    const iconClass = (path: string) => {
        return location.pathname === path ? 'currentPageIcon' : 'exposedIcon';
    }

    const pageLinks = [
        {
            path: '/',
            labelText: assignLabelText('Home'),
            icon: <HomeIcon iconClass={iconClass('/')} />
        },
        {
            path: '/gallery',
            labelText: assignLabelText(`${user ? 'your' : ''}card gallery`),
            icon: <GalleryIcon iconClass={iconClass('/gallery')} />
        },
        {
            path: '/account',
            labelText: assignLabelText(user ? 'your account' : 'account log-in'),
            icon: <AccountIcon iconClass={iconClass('/account')} />
        },
    ];
    return (
        <nav className='flex justify-evenly align-center'>
            {pageLinks.map(linkObject => {
                const { path, labelText, icon } = linkObject;
                return (
                    <Link
                        key={path}
                        to={path}
                        className="navLink"
                        aria-label={labelText}
                        title={labelText}
                    >
                        {icon}
                    </Link>
                )
            })}
        </nav>
    )
}