import axios from "axios";
import { getItem } from "./LocalStorage";

//Identifie l'administrateur grâce au token et envoie les infos utilisateur à modifier
export function changeCredentials(newCredentials) {
  const token = getItem("token");
  return axios
    .put("http://localhost:5002/login/", { ...newCredentials, token })
    .then((res) => {
      if (res.status === 201) console.log("Nouveaux identifiants enregistrés.");
    })
    .catch((err) => {
      if (err.response.status === 403) console.log("Vous n'êtes pas admin.");
      else
        console.error(
          "Les nouveaux identifiants n'ont pas pu être enregistrés."
        );
    });
}
