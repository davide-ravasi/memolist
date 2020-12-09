import { FETCH_LIST } from "./types";
import { db } from "../firebase";

export const fetchList = () => async (dispatch) => {
  // db.collection("notes")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach(function (doc) {
  //       console.log(doc.data());
  //     });
  //   });

  const list = await db.collection('notes').get();
  const arrayList = [];
  list.forEach(doc => {
    arrayList.push(doc.data());
  })

  console.log(arrayList);

  dispatch({ type: FETCH_LIST, payload: arrayList });
}