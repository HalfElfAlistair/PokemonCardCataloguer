import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';

export const Home = () => {

    // gets auth user
    const { user } = useAuth();
    // gets demo data
    const { data: demoData, setData } = useData();
    // gets firestore data
    const { data: userData } = useUserData();
    // Conditional determines whether user logged in to use data from firestore or demo data
    const dataToUse = user ? userData : demoData;

    console.log('dataToUse', dataToUse)

    return (
        <main className="home flex-center" role="main">
            <h1>Home</h1>
        </main>

    )
}