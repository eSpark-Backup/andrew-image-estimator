import {
    collection,
    doc,
    onSnapshot,
    deleteDoc,
    setDoc,
    getDocs,
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




export const AdminDetailsFields = [
    {
        id: 1,
        label: "Wear Plate Type for Estimate",
        options: [],
        placeholder: "available options",
        name: ADMIN_DETAILS_ENUMS.PLATE_TYPE,
        collectionRef: collectionRefPlateType
    },
    {
        id: 2,
        label: "Type of wear Plate Used Currently",
        options: [],
        placeholder: "available options",
        name: ADMIN_DETAILS_ENUMS.CURRENT_PLATE_TYPE,
        collectionRef: collectionRefCurrentUsedPlateType
    },
    {
        id: 3,
        label: "Abrasion Type",
        options: [],
        placeholder: "available options",
        name: ADMIN_DETAILS_ENUMS.ABRASION_TYPE,
        collectionRef: collectionRefAbrasionType
    },
    {
        id: 4,
        label: "Impact Type",
        options: [],
        placeholder: "available options",
        name: ADMIN_DETAILS_ENUMS.IMPACT_TYPE,
        collectionRef: collectionRefImpactType
    },
    {
        id: 5,
        label: "Brake Bends",
        options: [],
        placeholder: "available options",
        name: ADMIN_DETAILS_ENUMS.BRAKE_BENDS,
        collectionRef: collectionRefBrakeBends
    },
    {
        id: 6,
        label: "Fastening using Studs",
        options: [],
        placeholder: "available options",
        name:  ADMIN_DETAILS_ENUMS.FASTENING_USING_STUDS,
        collectionRef: collectionRefFasteningusingStuds
    },
    {
        id: 7,
        label: "Rolled Bends",
        options: [],
        placeholder: "available options",
        name: ADMIN_DETAILS_ENUMS.ROLLED_BENDS,
        collectionRef: collectionRefRolledBends
    },
    {
        id: 8,
        label: "Sunk Bolts",
        options: [],
        placeholder: "available options",
        name: ADMIN_DETAILS_ENUMS.SUNK_BOLTS,
        collectionRef: collectionRefSunkBolts
    },
]


export const dbRefCollections = [
    { ref: collectionRefPlateType, name: ADMIN_DETAILS_ENUMS.PLATE_TYPE },
    { ref: collectionRefCurrentUsedPlateType, name: ADMIN_DETAILS_ENUMS.CURRENT_PLATE_TYPE },
    { ref: collectionRefAbrasionType, name: ADMIN_DETAILS_ENUMS.ABRASION_TYPE },
    { ref: collectionRefImpactType, name: ADMIN_DETAILS_ENUMS.IMPACT_TYPE },
    { ref: collectionRefBrakeBends, name: ADMIN_DETAILS_ENUMS.BRAKE_BENDS },
    { ref: collectionRefFasteningusingStuds, name: ADMIN_DETAILS_ENUMS.FASTENING_USING_STUDS },
    { ref: collectionRefRolledBends, name: ADMIN_DETAILS_ENUMS.ROLLED_BENDS },
    { ref: collectionRefSunkBolts, name: ADMIN_DETAILS_ENUMS.SUNK_BOLTS }
  ];

  