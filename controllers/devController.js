import { sendError, sendResult } from "../constant/HttpResponse.js";
import { decryptJSON, encryptJSON } from "../utils/encryptdecrypt.js";
import dotenv from "dotenv";
import { InitiatSetupWizard } from "../models/SetupWizard.js";
dotenv.config();
import AWS from "aws-sdk";
import { Client } from "ssh2";
import fs from "fs";
// import { exec } from "child_process";

class DevController {
  static Encryptdata = async (req, res) => {
    const { data } = req.body;
    await encryptJSON(data)
      .then(async (encrypted_data) => {
        sendResult(res, encrypted_data, "success");
      })
      .catch((error) => {
        sendError(res, error, "Invalid Data");
      });
  };
  static Decryptdata = async (req, res) => {
    const { data } = req.body;
    await decryptJSON(data)
      .then(async (decrypted_data) => {
        sendResult(res, decrypted_data, "success");
      })
      .catch((error) => {
        sendError(res, error, "Invalid Data");
      });
  };

  static InitiatSetupWizard = async (req, res) => {
    try {
      await InitiatSetupWizard();
      sendResult(res, {}, "Imported data Successfully");
    } catch (error) {
      sendError(res, error.message, "Failed");
    }
  };

  static createInstanceEnviromentInAWS = async (req, res) => {
    try {
      // ssh username
      let instancePublicIpBody = "3.84.233.19";
      let username = "ubuntu";
      let privateKey = fs.readFileSync("./workspace.pem")
      // SSH Connection
      const conn = new Client();
      conn
        .on("ready", () => {
          console.log("Client :: ready");
          // Command to install Docker on the EC2 instance
          const installDockerCommand = `
          sudo apt update -y && 
          sudo apt install -y docker.io docker-compose &&
          sudo service docker start &&
          sudo docker run hello-world
        `;
          // Execute the command
          conn.exec(installDockerCommand, (err, stream) => {
            if (err) throw err;
            stream
              .on("close", (code, signal) => {
                console.log(
                  `Stream :: close :: code: ${code}, signal: ${signal}`
                );
                conn.end();
                res.send("Docker installed successfully on EC2 instance.");
              })
              .on("data", (data) => {
                console.log("STDOUT: " + data);
              })
              .stderr.on("data", (data) => {
                console.log("STDERR: " + data);
              });
          });
        })
        .connect({
          host: instancePublicIpBody,
          port: 22,
          username,
          privateKey,
          debug: (info) => console.log("DEBUG: " + info), // Debug logging for connection
        });
    } catch (error) {
      console.log(error);
    }
  };

  static getEC2InstanceDetails = async (req, res) => {
    let region = "us-east-1";
    let accessKeyId = process.env.ACCESSKEY;
    let secretAccessKey = process.env.SECRETACCESSKEY;
    let InstanceId = "i-0d26730ea086bcc2f";

    const ec2 = new AWS.EC2({
      region,
      accessKeyId,
      secretAccessKey,
    });
    const instanceParams = {
      InstanceIds: [InstanceId],
    };
    const instanceData = await ec2.describeInstances(instanceParams).promise();
    const instance = instanceData.Reservations[0].Instances[0];

    res.send(instance);
  };
}

export default DevController;
