import { querySnapshot, addDoc, collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
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
    },

    deleteEmployee : async(id)=>{
        try {
            const employeeRef = doc(db, "employee",id);
            await deleteDoc(employeeRef);
            return "Successfully deleted employee"
        } catch (e) {
            console.log("Error deleting employee: ",e);
            throw new Error(e);
        }
    }
}