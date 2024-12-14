import {
  collection,
  getDocs,
  doc,
  query,
  limit,
  startAfter,
  orderBy,
  DocumentSnapshot,
  getDoc,
  setDoc,
  deleteDoc,
  getCountFromServer,
  addDoc,
  updateDoc,
  where,
  
} from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";
import { User } from "../entities/user";
import bcrypt from "bcrypt";

const userCollectionRef = collection(firestore, "users");

/**
 * Get a paginated list of users.
 * @param page - Current page number (starts from 1).
 * @param perPage - Number of items per page.
 * @param lastVisible - The last visible document from the previous page for pagination.
 * @returns Object containing users, total count, page, and perPage.
 */
export async function getUserList(): Promise<{
  users: User[];
}> {
  const querySnapshot = await getDocs(query(userCollectionRef));

  // Map Firestore documents to User entities
  const users: User[] = querySnapshot.docs.map((doc) => {
    return { ...(doc.data() as User) };
  });

  return { users };
}

/**
 * Get a user document by username then password.
 */
export async function getUserByName(user: User): Promise<string | null> {
  const q = query(userCollectionRef, where("u", "==", user.u));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    const userData = docSnap.data() as User;

    return userData.p;
  }

  return null
}

/**
 * Add or update a user document.
 */
export async function saveUser(user: User): Promise<void> {
  // Step 1: Find the document by `u` field
  const q = query(userCollectionRef, where('u', '==', user.u));
  const querySnapshot = await getDocs(q);

  // Step 2: Check if the document exists
  if (!querySnapshot.empty) {
    // Document found, update the fields `u` and `p`
    const docRef = querySnapshot.docs[0].ref; // Get the document reference of the first matching document

    await updateDoc(docRef, {
      u: user.u,
      p: user.p,
      updatedAt: new Date().getTime(),
    });

    console.log(`Updated user with u: ${user.u}`);
  } else {
    console.log(`No user found with u: ${user.u}`);

    const docRef = await addDoc(userCollectionRef, {
      ...user,
      createdAt: new Date().getTime(),
    });
    console.log(`Added new user with ID: ${docRef.id}`);
  }
}

/**
 * Delete a user document.
 */
export async function deleteUser(id: string): Promise<void> {
  const docRef = doc(userCollectionRef, id);
  await deleteDoc(docRef);
}
