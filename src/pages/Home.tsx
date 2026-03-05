import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';


import { useState } from "react";

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


    const [modalOne, setModalOne] = useState(false);
    const updateModalOne = () => {
        setModalOne(!modalOne)
    }

    const [modalTwo, setModalTwo] = useState(false);
    const updateModalTwo = () => {
        setModalTwo(!modalTwo)
    }

    const generateArray = (n: number) => {
        let arr: number[] = [];
        for (let i = 0; i < n; i++) {
            arr.push(i + 1)
        }
        return arr;
    }

    const modalTwoComponent = () => {
        return (
            <div
                style={{
                    position: 'fixed',
                    zIndex: 3,
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '60%',
                    backgroundColor: 'blue',
                    overflow: 'auto'
                }}
            >
                <ul
                    style={{
                        margin: '5%',
                        backgroundColor: 'lime',
                        listStyleType: 'none',
                        padding: 0,
                        overflow: 'scroll'
                    }}
                >
                    {generateArray(15).map((n: number) => {
                        return (
                            <li
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    border: 'solid 3px black',
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    height: '60px'
                                }}
                            >
                                Item-{n}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }


    return (
        <div className="home flex-center">
            <h1>Home</h1>
        </div>
    )
}