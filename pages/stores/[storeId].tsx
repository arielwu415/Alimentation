import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Stores from '.';
import ItemCard from '../../components/cards/ItemCard';
import Layout from '../../components/layouts/Layout';
import firebase from '../../firebase/config'
import styles from '../../styles/StoreView.module.scss'

export default function Store()
{
    const router = useRouter();
    const {storeId} = router.query;

    const [storeData, setStoreData] = useState(null)
    const [items, setItems] = useState([])

    useEffect(()=>{
        //@ts-ignore
        firebase.firestore().collection("stores").doc(storeId).get().then(doc => {
            console.log(doc)
            setStoreData(doc.data())
            //@ts-ignore
            firebase.firestore().collection("stores").doc(storeId).collection("items").get().then(snapshot => {
                let tempItems = []
                snapshot.forEach(doc => {
                    tempItems.push(doc)
                })
                setItems(tempItems)
                console.log(tempItems)
            })
        })
    }, [])

    return (
        <>
            {
                storeData && 
                <main className = {styles.main_container}>
                    <h1>
                        {storeData.name}
                    </h1>
                    <div className={styles.item_grids}>
                        {
                            items.map((item, i) => {
                                return <ItemCard itemDoc={item} key={"item"+i}/>
                            })
                        }
                    </div>
                </main>
            }
        </>
    )
}

Store.getLayout = page => <Layout>{page}</Layout>