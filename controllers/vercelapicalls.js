import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const vercelToken = "OnpPrMtcTEGGOFduENVDCDoe";
const teamId = "team_BSPd30BcowfH5EaK1xq3RNhc";

export async function createVercelProject(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://api.vercel.com/v10/projects?teamId=${teamId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vercelToken}`,
        },
        data: JSON.stringify(data),
      };
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
          reject("Failed to create project in Vercel1");
        });
    } catch (error) {
      console.error("Error creating project and deploying:", error.message);
      reject("Failed to create project in Vercel2");
    }
  });
}
