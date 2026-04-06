import { Link } from '@tanstack/react-router';
import { GalleryIcon } from '../assets/svg/GalleryIcon';
import { AccountIcon } from '../assets/svg/AccountIcon';
import { SearchIcon } from '../assets/svg/SearchIcon';
import { useAuth } from '../state/auth-context';
import { useSortFilterStates } from '../state/sortFilterContext';
import { useLocation } from '@tanstack/react-router';

export const Nav = () => {
    const { user } = useAuth();
    const { updateCurrentPage } = useSortFilterStates();

    const assignLabelText = (str: string) => {
        return `Link to ${str} page`;
    }

    const { pathname } = useLocation();

    const iconClass = (path: string) => {
        return pathname === path ? 'currentPageIcon' : 'exposedIcon';
    }

    const pageLinks = [
        {
            path: '/',
            labelText: assignLabelText(`${user ? 'your' : ''}card gallery`),
            icon: <GalleryIcon iconClass={iconClass('/')} />
        },
        {
            path: '/search',
            labelText: assignLabelText('card search'),
            icon: <SearchIcon iconClass={iconClass('/search')} />
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
                        onClick={() => {
                            if (path === '/' || path === '/search') {
                                updateCurrentPage(path);
                            }
                        }}
                    >
                        {icon}
                    </Link>
                )
            })}
        </nav>
    )
}