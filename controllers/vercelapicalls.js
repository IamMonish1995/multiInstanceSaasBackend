import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const vercelToken = "OnpPrMtcTEGGOFduENVDCDoe";
const teamId = "team_BSPd30BcowfH5EaK1xq3RNhc";

export async function createVercelProject(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vercelToken}`,
        },
      };
      axios
        .post(
          `https://api.vercel.com/v10/projects?teamId=${teamId}`,
          data,
          config
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject("Failed to create project in Vercel");
          console.error(error);
        });
    } catch (error) {
      console.error("Error creating project and deploying:", error.message);
      reject("Failed to create project in Vercel2");
    }
  });
}
export async function deployVercelProject(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vercelToken}`,
        },
      };
      axios
        .post(
          `https://api.vercel.com/v12/now/deployments?teamId=${teamId}`,
          data,
          config
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject("Failed to create project in Vercel");
          console.error(error);
        });
    } catch (error) {
      console.error("Error creating project and deploying:", error.message);
      reject("Failed to create project in Vercel2");
    }
  });
}
