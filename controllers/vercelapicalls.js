import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const vercelToken = "OnpPrMtcTEGGOFduENVDCDoe";
const teamId = "team_BSPd30BcowfH5EaK1xq3RNhc";

export async function createVercelProject(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${vercelToken}`);

      const raw = JSON.stringify(data);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `https://api.vercel.com/v10/projects?teamId=${teamId}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject("Failed to create project in Vercel1");
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
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${vercelToken}`);

      const raw = JSON.stringify(data);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `https://api.vercel.com/v12/now/deployments?teamId=${teamId}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject("Failed to create project in Vercel1");
          console.error(error);
        });
    } catch (error) {
      console.error("Error creating project and deploying:", error.message);
      reject("Failed to create project in Vercel2");
    }
  });
}
