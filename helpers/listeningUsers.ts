// realTimeData.ts
import { db } from "@/config/firestoreconfig";
import { CollectionData } from "@/interfaces/CollectionData";
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function listenToCollectionChanges(callback: (data: CollectionData[]) => void): () => void {
    const collectionRef = collection(db, "users");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {

        //@ts-ignore
        const data: CollectionData[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...doc.data()
        }));

        callback(data);
    }, (error) => {
        console.error("Error escuchando cambios:", error);
    });

    return unsubscribe;
}
