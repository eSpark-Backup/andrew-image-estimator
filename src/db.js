import {
    collection,
} from "firebase/firestore";
import db from "./firebase";
import { ADMIN_DETAILS_ENUMS } from "./constants";


export const collectionRefPlateType = collection(db, "Wear Plate Type");
export const collectionRefCurrentUsedPlateType = collection(db, "Current Used Wear Plate Type");
export const collectionRefAbrasionType = collection(db, "Abrasion Type");
export const collectionRefImpactType = collection(db, "Impact Type");
export const collectionRefBrakeBends = collection(db, "Brake Bends");
export const collectionRefFasteningusingStuds = collection(db, "Fastening using Studs");
export const collectionRefRolledBends = collection(db, "Rolled Bends");
export const collectionRefSunkBolts = collection(db, "Sunk Bolts");
export const collectionRefEstimatedDeliveryDate = collection(db, "Estimated Delivery Date");

export const collectionRef = collection(db, "details_form");
export const collectionRefRes = collection(db, "result");
export const dbRefCollections = { ref: collectionRef, name: "details_form" };
export const dbRefResCollections = { ref: collectionRefRes, name: "result" };

  