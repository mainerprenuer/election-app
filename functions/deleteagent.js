import { storage } from "../utils/firebase";
import { ref, deleteObject } from "firebase/storage";
import axios from "axios";
// import Agent from "../types/agent"

export default async function deleteAgent(
  agentID,
  imgUrl,
  setDeleting,
  router
) {
  const desertRef = ref(storage, imgUrl);

  // await deleteObject(desertRef)
  //   .then(() => {
  //     axios
  //       .delete(`https://rxedu-api.vercel.app/api/v1/agent/${agentID}`)
  //       .then((val) => {
  //         console.log("Deleted Successfully");
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // alert("Are you sure you want to delete this user?");
  setDeleting(true);
  axios
    .delete(`https://rxedu-api.vercel.app/api/v1/agent/${agentID}`)
    .then((val) => {
      console.log("Deleted Successfully");
    })
    .then(() => {
      setDeleting(false);
      router.reload(window.location.pathname);
    });
}

export async function updateAgentInfo(agent) {
  axios
    .patch(`https://rxedu-api.vercel.app/api/v1/agent/${agentID}`, agent)
    .then((val) => {
      console.log("Deleted Successfully");
    });
}
