import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import firestoreDatabase from "../firebaseConfig";

export const AddInstructor = async (payload) => {
  try {
    await setDoc(
      doc(firestoreDatabase, "instructors", payload.userId),
      payload
    );

    // update user role
    await updateDoc(doc(firestoreDatabase, "users", payload.userId), {
      role: "instructor",
    });
    return {
      success: true,
      message: "instructor added successfully , please wait for approval",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const CheckIfInstructorAccountIsApplied = async (id) => {
  try {
    const instructors = await getDocs(
      query(
        collection(firestoreDatabase, "instructors"),
        where("userId", "==", id)
      )
    );
    if (instructors.size > 0) {
      return {
        success: true,
        message: "instructor account already applied",
        data: instructors.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })[0],
      };
    }
    return {
      success: false,
      message: "instructor account not applied",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const GetAllInstructors = async () => {
  try {
    const instructors = await getDocs(
      collection(firestoreDatabase, "instructors")
    );
    return {
      success: true,
      data: instructors.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      }),
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const UpdateInstructor = async (payload) => {
  try {
    await setDoc(doc(firestoreDatabase, "instructors", payload.id), payload);
    return {
      success: true,
      message: "instructor updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const GetInstructorById = async (id) => {
  try {
    const instructor = await getDoc(doc(firestoreDatabase, "instructors", id));
    return {
      success: true,
      data: instructor.data(),
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
