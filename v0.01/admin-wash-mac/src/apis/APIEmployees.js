import {
  querySnapshot,
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  getFirestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../configs/firebase";
import { message } from "antd";

export const APIEmployees = {
  getEmployees: async () => {
    try {
      const result = await getDocs(collection(db, "employee"));
      const employees = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("API calls succesful: ");
      return employees;
    } catch (error) {
      message.error("login failed. your email or password is wrong!");
    }
  },
  getEmployeeById: async (id) => {
    try {
      const docRef = doc(db, "employee", `${id}`);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  addEmployee: async (employee) => {
    try {
      const employeeRef = await addDoc(collection(db, "employee"), employee);
      console.log("Document written with ID: ", employeeRef.id);
      return employeeRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error(e);
    }
  },
  deleteEmployee: async (id) => {
    try {
      const employeeRef = doc(db, "employee", id);
      await deleteDoc(employeeRef);
      return "Successfully deleted employee";
    } catch (e) {
      console.log("Error deleting employee: ", e);
      throw new Error(e);
    }
  },
  updateEmployee: async (id, data) => {
    try {
      const docRef = doc(db, "employee", id);
      await updateDoc(docRef, data).then(() => {
        console.log("data has been updated");
      });
    } catch (error) {
      alert("error update document:", error);
      console.error(error);
      throw new Error(error);
    }
  },
};
