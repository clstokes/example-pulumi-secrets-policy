import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();

// Ensure the cluster password input is a secret.
const clusterPassword = config.requireSecret("clusterPassword");

const cluster = new aws.rds.Cluster("default", {
    availabilityZones: [
        "us-west-2a",
        "us-west-2b",
        "us-west-2c",
    ],
    backupRetentionPeriod: 5,
    clusterIdentifier: "aurora-cluster-demo",
    databaseName: "mydb",
    engine: "aurora-mysql",
    engineVersion: "5.7.mysql_aurora.2.03.2",
    preferredBackupWindow: "07:00-09:00",

    masterUsername: "foo",
    masterPassword: clusterPassword,
}, {
    // Ensure the cluster password output is a secret.
    additionalSecretOutputs: ["masterPassword"],
});

export const clusterUsernameOutput = cluster.masterUsername;
export const clusterPasswordOutput = cluster.masterPassword;
