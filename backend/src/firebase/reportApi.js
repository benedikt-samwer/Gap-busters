import { db } from "./config.js";
import { collection, query, where, getDocs, setDoc, doc, addDoc } from "firebase/firestore";

export const addReport = async (projectId, userId, sourceData, azureData, azureConfidenceScore) => {
    if(await addDoc(collection(db, "projects", projectId, "reports"), {
        userID: userId,
        sourceData: sourceData,
        azureData: azureData,
        azureConfidenceScore: azureConfidenceScore
    })){
        return true;
    };
    return false;
}

export const getReportsData = async (projectId) => {
    const q = query(collection(db, "projects", projectId, "reports"));
    let result = await getDocs(q);
    let toReturn = [];
    result.forEach((doc) => {
        toReturn.push(doc.data().azureData);
    });
    console.log(toReturn);
    return toReturn;
}