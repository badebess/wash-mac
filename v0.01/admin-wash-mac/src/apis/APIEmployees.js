import { querySnapshot, addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../configs/firebase";
import { message } from "antd";

export const APIEmployees = {
    getEmployees : async()=>{
        try {
            const result = await getDocs(collection(db, "employee"));
            const employees = result.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log('API calls succesful: ',result.id);
            console.log(employees);
            return employees;
        } catch (error) {
            message.error("login failed. your email or password is wrong!");
        }
    }
}