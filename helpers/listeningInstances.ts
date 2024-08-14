import { db } from "@/config/firestoreconfig";
import { CollectionData } from "@/interfaces/CollectionData";
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot, getDoc, doc } from "firebase/firestore";




export function listenToCollectionChangesInstances(callback: (data: (DataStructureInstance & { userName?: string })[]) => void): () => void {
    const collectionRef = collection(db, "instances");

    const unsubscribe = onSnapshot(collectionRef, async (snapshot) => {
        try {

            //@ts-ignore
            const data: DataStructureInstance[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data() as DataStructureInstance

            }));


            const dataWithUserNames = await Promise.all(data.map(async (instance) => {
                const userRef = doc(db, "users", instance.user_id);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data() as CollectionData;
                    return {
                        ...instance,
                        userName: userData.name
                    };
                } else {
                    return {
                        ...instance,
                        userName: "Unknown"
                    };
                }
            }));

            callback(dataWithUserNames);
        } catch (error) {
            console.error("Error obteniendo datos:", error);
        }
    }, (error) => {
        console.error("Error escuchando cambios:", error);
    });

    return unsubscribe;
}
